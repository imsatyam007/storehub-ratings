import express from "express";

import {
  getDashboard,
  createUser,
  createStore,
  getUsers,
  getUserById,
  getStores,
  getStoreById,
  getRatings,
} from "../controllers/admin.controller.js";

import authenticateUser from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createUserValidation,
  createStoreValidation,
} from "../validators/auth.validator.js";

import validate from "../middleware/validation.middleware.js";

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getDashboard
);

// Create User
router.post(
  "/users",
  authenticateUser,
  authorizeRoles("ADMIN"),
  createUserValidation,
  validate,
  createUser
);

// Create Store 
router.post(
  "/stores",
  authenticateUser,
  authorizeRoles("ADMIN"),
  createStoreValidation,
  validate,
  createStore
);

// Get All Users
router.get(
  "/users",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getUsers
);

// Get User Details 
router.get(
  "/users/:id",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getUserById
);

// Get All Stores
router.get(
  "/stores",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getStores
);

// Get Store Details (Admin)
router.get(
  "/stores/:id",
  getStoreById
);

// Get All Ratings (Admin)
router.get(
  "/ratings",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getRatings
);
export default router;

