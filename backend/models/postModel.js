import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: String,
      ref: "Category",
    },
    user: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
