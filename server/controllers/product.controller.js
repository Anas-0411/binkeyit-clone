import ProductModel from "./../models/product.model.js";

// add product
export const addProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    // validation
    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !stock ||
      !price ||
      !discount ||
      !description
    ) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    // create new product
    const newProduct = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });
    // save product
    const saveProduct = await newProduct.save();
    // if product not saved
    if (!saveProduct) {
      return res.status(500).send({
        message: "Failed to add product",
        success: false,
        error: true,
      });
    }
    // success
    return res.status(201).send({
      message: "Product added successfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

// get all products
export const getAllProductsController = async (req, res) => { 
  try {
    let { page, limit, search } = req.body

    if (!page) {
      page: 1
    }
    if (!limit) {
      limit: 10
    }
    // search
    const query = search ? { $text: {$search: search} } : {}

    // pagination
    const skip = (page - 1) * limit;
    
    // get data
    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),ProductModel.countDocuments(query)
    ]);

    return res.status(200).json({
      error: false,
      success: true,
      message: "Product fetched successfully",
      data: data,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    })

  }
  catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}