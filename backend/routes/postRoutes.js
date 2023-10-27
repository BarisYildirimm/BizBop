import express from "express";
import {
  getPosts,
  getPostsById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  updatePostToPublic,
} from "../controllers/postController.js";

import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/mine", protect, getMyPosts);
router.put("/:id/public", updatePostToPublic);
router.put("/:id", protect, updatePost);

router.get("/:id", getPostsById);
router.post("/", protect, createPost);

router.delete("/:id", deletePost);

export default router;
