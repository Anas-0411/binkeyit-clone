import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "./../models/subCategory.model.js";
import ProductModel from "./../models/product.model.js";

// Add new category
export const addCategoryController = async (req, res) => {
  try {
    // Extract data
    const { name, image } = req.body;
    // Validation
    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Create new category
    const newCategory = new CategoryModel({
      name,
      image,
    });
    const savedCategory = await newCategory.save();

    // If category not saved
    if (!savedCategory) {
      return res.status(400).json({
        message: "Failed to upload category",
        error: true,
        success: false,
      });
    }

    // Success
    return res.status(201).json({
      message: "Category uploaded successfully",
      data: savedCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

// get category
export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    return res.status(200).json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

// update category controller
export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await CategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true } // return updated document
    );

    if (!update) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

    return res.status(200).json({
      message: "Category deleted successfully",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
