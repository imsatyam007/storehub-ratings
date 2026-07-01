import express from "express";
import { getDashboard } from "../controllers/owner.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("OWNER"),
  getDashboard
);

export default router;