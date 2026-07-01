import express from "express";
import { getStores,
        submitRating,
        updateRating,
        updatePassword,
        getDashboard,
        getStoreById,
        getMyRatings,
        } from "../controllers/user.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import { submitRatingValidation,
        updatePasswordValidation,
        } from "../validators/auth.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

// View All Stores (Normal User)
router.get(
  "/stores",
  authenticateUser,
  authorizeRoles("USER"),
  getStores
);

router.post(
  "/stores/:storeId/rating",
  authenticateUser,
  authorizeRoles("USER"),
  submitRatingValidation,
  validate,
  submitRating
);

router.put(
  "/stores/:storeId/rating",
  authenticateUser,
  authorizeRoles("USER"),
  submitRatingValidation,
  validate,
  updateRating
);

router.put(
  "/password",
  authenticateUser,
  authorizeRoles("USER", "OWNER"),
  updatePasswordValidation,
  validate,
  updatePassword
);

router.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("USER"),
  getDashboard
);

router.get(
  "/stores/:id",
  authenticateUser,
  authorizeRoles("USER"),
  getStoreById
);

router.get(
  "/ratings",
  authenticateUser,
  authorizeRoles("USER"),
  getMyRatings
);
export default router;