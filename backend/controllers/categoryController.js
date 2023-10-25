import CategoryModel from "../models/categoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const data = await CategoryModel.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
