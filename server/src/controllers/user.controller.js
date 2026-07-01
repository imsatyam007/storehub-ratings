import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";


// ==============================
// Get All Stores (User)
// ==============================
export const getStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, address } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        name: name
          ? {
              contains: name,
              mode: "insensitive",
            }
          : undefined,

        address: address
          ? {
              contains: address,
              mode: "insensitive",
            }
          : undefined,
      },

      include: {
        ratings: true,
      },

      orderBy: {
        name: "asc",
      },
    });

    const formattedStores = stores.map((store) => {
      const overallRating =
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

      const userRating =
        store.ratings.find(
          (rating) => rating.userId === userId
        )?.rating || null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating,
        userRating,
      };
    });

    return res.status(200).json({
      success: true,
      totalStores: formattedStores.length,
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
// Submit Rating
// ==============================
export const submitRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Check if store exists
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    // Prevent duplicate ratings
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store. Please update your rating instead.",
      });
    }

    const newRating = await prisma.rating.create({
      data: {
        rating,
        userId,
        storeId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully.",
      rating: newRating,
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
// Update Rating
// ==============================
export const updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Check if rating exists
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found. Please submit a rating first.",
      });
    }

    const updatedRating = await prisma.rating.update({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      data: {
        rating,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully.",
      rating: updatedRating,
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
// Update Password
// ==============================
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
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
// User Dashboard
// ==============================
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalStores = await prisma.store.count();

    const myRatings = await prisma.rating.findMany({
      where: {
        userId,
      },
    });

    const totalRatings = myRatings.length;

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              myRatings.reduce(
                (sum, item) => sum + item.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          )
        : 0;

    return res.status(200).json({
      success: true,
      dashboard: {
        totalStores,
        totalRatings,
        averageRating,
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
// Store Details
// ==============================
export const getStoreById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        ratings: true,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    const overallRating =
      store.ratings.length > 0
        ? Number(
            (
              store.ratings.reduce(
                (sum, item) => sum + item.rating,
                0
              ) / store.ratings.length
            ).toFixed(1)
          )
        : 0;

    const userRating =
      store.ratings.find(
        (rating) => rating.userId === userId
      )?.rating || null;

    return res.status(200).json({
      success: true,
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating,
        userRating,
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
// My Ratings
// ==============================
export const getMyRatings = async (req, res) => {
  try {
    const userId = req.user.id;

    const ratings = await prisma.rating.findMany({
      where: {
        userId,
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      totalRatings: ratings.length,
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