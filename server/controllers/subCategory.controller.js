import SubCategoryModel from "./../models/subCategory.model.js";

// Add new subCategory
export const addSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    // validation
    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    // create new subcategory
    const newSubCategory = new SubCategoryModel({
      name,
      image,
      category,
    });

    // save sub category
    const savedSubCategory = await newSubCategory.save();

    // If category not saved
    if (!savedSubCategory) {
      return res.status(400).json({
        message: "Failed to save sub-category",
        success: false,
        error: true,
      });
    }

    //success
    return res.status(201).json({
      message: "Sub-Category saved successfully!",
      data: savedSubCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

// get sub category
export const getSubCategoryController = async (req, res) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.status(200).json({
      message: "Sub Category Data",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update sub category
export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
    // validation
    const checkSubCategory = await SubCategoryModel.findById(_id);
    if (!checkSubCategory) {
      return res.status(404).json({
        message: "Sub Category not found",
        error: true,
        success: false,
      });
    }
    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });
    return res.status(200).json({
      message: "Sub Category updated successfully",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// delete sub category
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    // validation
    const checkSubCategory = await SubCategoryModel.findById(_id);
    if (!checkSubCategory) {
      return res.status(404).json({
        message: "Sub Category not found",
        error: true,
        success: false,
      });
    }
    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);
    return res.status(200).json({
      message: "Sub Category deleted successfully",
      data: deleteSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
