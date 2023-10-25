import CategoryModel from "../models/categoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const data = await CategoryModel.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = new CategoryModel({
      name: req.body.name,
    });

    await newCategory.save();
    res.status(200).json("Created Category");
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (category) {
      category.name = req.body.name;
      const updateCategory = await category.save();
      res.json(updateCategory);
    } else {
      console.log("Category Not Found!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (category) {
      await CategoryModel.deleteOne({ _id: category._id });
      res.status(200).json("Deleted");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};
