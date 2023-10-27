import express from "express";
import {
  authUser,
  getUsers,
  logoutUser,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/logout", logoutUser);
router.put("/profile", protect, updateUserProfile);

export default router;
