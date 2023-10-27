import express from "express";
import {
  getPosts,
  getPostsById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/mine", protect, getMyPosts);
router.get("/:id", getPostsById);
router.post("/", protect, createPost);

router.put("/:id", protect, updatePost);
router.delete("/:id", deletePost);

export default router;
