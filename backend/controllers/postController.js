import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({}).populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};

export const getPostsById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};

export const createPost = async (req, res) => {
  console.log("Ekleme işlemine Geldi !");
  try {
    const post = await new PostModel({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      likeCount: req.body.likeCount,
      isPublic: req.body.isPublic,
      category: req.body.category,
      user: req.user,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};
export const updatePostToPublic = async (req, res) => {
  const post = await PostModel.findById(req.body.postId);

  if (post) {
    post.isPublic = req.body.sw;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      post.title = req.body.title;
      post.description = req.body.description;
      post.likeCount = req.body.likeCount;
      post.category = req.body.category;

      await post.save();
      res.status(200).json("Updated Post");
    } else {
      res.status(404).json("Post Not Found!");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log("Sildi");
    const post = await PostModel.findById(req.params.id);

    if (post) {
      await PostModel.deleteOne({ _id: post._id });
      res.status(200).json("Post Deleted successfully!");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Resource not found");
  }
};
