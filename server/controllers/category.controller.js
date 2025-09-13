import CategoryModel from "../models/category.model.js";

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
