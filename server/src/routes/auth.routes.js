import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";
import validate from "../middleware/validation.middleware.js";
import authenticateUser from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - address
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Anderson Williams
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               address:
 *                 type: string
 *                 example: 123 Main Street, New York
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation error.
 */
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully.",
    user: req.user,
  });
});

// Only Admin
router.get(
  "/admin",
  authenticateUser,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

// Only User
router.get(
  "/user",
  authenticateUser,
  authorizeRoles("USER"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome User",
    });
  }
);

// Only Store Owner
router.get(
  "/owner",
  authenticateUser,
  authorizeRoles("OWNER"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Store Owner",
    });
  }
);

export default router;