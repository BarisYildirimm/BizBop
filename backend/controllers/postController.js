import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getPostsById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await new PostModel({
      title: req.body.title,
      description: req.body.description,
      likeCount: req.body.likeCount,
      isPublic: req.body.isPublic,
      category: req.body.category,
      user: req.user,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      post.title = req.body.title;
      post.description = req.body.description;
      post.likeCount = req.body.likeCount;
      post.isPublic = req.body.isPublic;
      post.category = req.body.category;
      post.user = req.user;

      await post.save();
      res.status(200).json("Updated Post");
    } else {
      res.status(404).json("Post Not Found!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      await PostModel.deleteOne({ _id: post._id });
      res.status(200).json("Post Deleted successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};
