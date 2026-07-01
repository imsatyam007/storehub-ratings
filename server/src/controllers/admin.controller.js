import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

// ==============================
// Admin Dashboard
// ==============================
export const getDashboard = async (req, res) => {
  try {
    // Statistics
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    // Average Rating
    const average = await prisma.rating.aggregate({
      _avg: {
        rating: true,
      },
    });

    // Recent Users
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Recent Stores
    const stores = await prisma.store.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        ratings: true,
      },
    });

    const recentStores = stores.map((store) => {
      const averageRating =
        store.ratings.length > 0
          ? Number(
              (
                store.ratings.reduce(
                  (sum, rating) => sum + rating.rating,
                  0
                ) / store.ratings.length
              ).toFixed(1)
            )
          : 0;

      return {
        id: store.id,
        name: store.name,
        owner: store.owner?.name,
        rating: averageRating,
      };
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalStores,
        totalRatings,
        averageRating: Number(
          average._avg.rating || 0
        ).toFixed(1),
        recentUsers,
        recentStores,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create User (Admin)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create Store (Admin)

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    // Check if store email already exists
    const existingStore = await prisma.store.findUnique({
      where: {
        email,
      },
    });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store email already exists.",
      });
    }

    // Check if owner exists
    const owner = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found.",
      });
    }

    // Ensure selected user is actually a Store Owner
    if (owner.role !== "OWNER") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a Store Owner.",
      });
    }

    // Create Store
    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Store created successfully.",
      store,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Users (Admin)
// ==============================
export const getUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      order = "asc",
    } = req.query;

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Reusable where object
    const where = {
      name: name
        ? {
            contains: name,
            mode: "insensitive",
          }
        : undefined,

      email: email
        ? {
            contains: email,
            mode: "insensitive",
          }
        : undefined,

      address: address
        ? {
            contains: address,
            mode: "insensitive",
          }
        : undefined,

      role: role || undefined,
    };

    // Count total matching users
    const totalUsers = await prisma.user.count({
      where,
    });

    // Validate sorting
    const allowedSortFields = [
      "name",
      "email",
      "address",
      "role",
      "createdAt",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    const sortOrder = order === "desc" ? "desc" : "asc";

    const users = await prisma.user.findMany({
      where,

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },

      orderBy: {
        [sortField]: sortOrder,
      },

      skip,
      take: limit,
    });

    return res.status(200).json({
      success: true,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      limit,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get User Details (Admin)
// ==============================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        stores: {
          include: {
            ratings: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let averageRating = null;

    if (user.role === "OWNER" && user.stores.length > 0) {
      const ratings = user.stores.flatMap(store => store.ratings);

      if (ratings.length > 0) {
        averageRating =
          ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          ratings.length;
      } else {
        averageRating = 0;
      }
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        rating: averageRating,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Stores (Admin)
// ==============================
export const getStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      order = "asc",
    } = req.query;

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Allow sorting only by valid fields
    const allowedSortFields = ["name", "email", "address", "createdAt"];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    // Reusable where object
    const where = {
      name: name
        ? {
            contains: name,
            mode: "insensitive",
          }
        : undefined,

      email: email
        ? {
            contains: email,
            mode: "insensitive",
          }
        : undefined,

      address: address
        ? {
            contains: address,
            mode: "insensitive",
          }
        : undefined,
    };

    // Total stores matching filters
    const totalStores = await prisma.store.count({
      where,
    });

    const stores = await prisma.store.findMany({
      where,

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ratings: true,
      },

      orderBy: {
        [sortField]: order === "desc" ? "desc" : "asc",
      },

      skip,
      take: limit,
    });

    const formattedStores = stores.map((store) => {
      const averageRating =
        store.ratings.length > 0
          ? (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0
              ) / store.ratings.length
            ).toFixed(1)
          : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        rating: Number(averageRating),
        createdAt: store.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      totalStores,
      currentPage: page,
      totalPages: Math.ceil(totalStores / limit),
      limit,
      stores: formattedStores,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get Store Details (Admin)
// ==============================
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ratings: true,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    const averageRating =
      store.ratings.length > 0
        ? Number(
            (
              store.ratings.reduce(
                (sum, rating) => sum + rating.rating,
                0
              ) / store.ratings.length
            ).toFixed(1)
          )
        : 0;

    return res.status(200).json({
      success: true,
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        averageRating,
        totalRatings: store.ratings.length,
        createdAt: store.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Ratings (Admin)
// ==============================
export const getRatings = async (req, res) => {
  try {
    const {
      user = "",
      store = "",
      rating,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(rating && {
        rating: Number(rating),
      }),

      ...(user && {
        user: {
          name: {
            contains: user,
            mode: "insensitive",
          },
        },
      }),

      ...(store && {
        store: {
          name: {
            contains: store,
            mode: "insensitive",
          },
        },
      }),
    };

    const totalRatings = await prisma.rating.count({
      where,
    });

    const ratings = await prisma.rating.findMany({
      where,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        [sortBy]: order === "asc" ? "asc" : "desc",
      },

      skip,
      take: limit,
    });

    return res.status(200).json({
      success: true,
      totalRatings,
      currentPage: page,
      totalPages: Math.ceil(totalRatings / limit),
      limit,
      ratings,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};