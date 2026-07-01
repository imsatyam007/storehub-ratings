import prisma from "../config/prisma.js";

// ==============================
// Store Owner Dashboard
// ==============================
export const getDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await prisma.store.findFirst({
      where: {
        ownerId,
      },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "No store found for this owner.",
      });
    }

    const averageRating =
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

    const ratedUsers = store.ratings.map((item) => ({
      id: item.user.id,
      name: item.user.name,
      email: item.user.email,
      rating: item.rating,
    }));

    return res.status(200).json({
      success: true,
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating,
      },
      totalRatings: store.ratings.length,
      ratedUsers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};