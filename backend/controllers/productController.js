const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose"); // Import mongoose

// Display all products
const getAllProductss = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const filter = req.query.filter || "";
  const status = req.query.status || "";
  const storeID = req.query.storeID;

  try {
    const filterCondition = { name: { $regex: filter, $options: "i" } };
    if (status !== "") filterCondition.status = status;
    const totalProducts = await Product.find(filterCondition).countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage) || 1;
    const skip = (page - 1) * perPage;
    const products = await Product.find(filterCondition).skip(skip).limit(perPage).populate({
      path: "categoryID",
    });
    res.send({ products, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};

// Display one product
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
};

// Create new product with image upload
const createProduct = async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => cloudinary.uploader.upload(file.path));
    const uploadResults = await Promise.all(uploadPromises);
    const images = uploadResults.map((result) => result.secure_url);

    const { name, status, categoryID, price } = req.body;
    const newProduct = new Product({ name, status, categoryID, price, images });
    await newProduct.save();
    res.status(201).send({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).send({ message: "Error creating product", error });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let existingImages = req.body.images || [];
    const { name, status, categoryID, price } = req.body;

    if (!Array.isArray(existingImages)) {
      existingImages = [existingImages];
    }
    const uploadPromises = req.files.map((file) => cloudinary.uploader.upload(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    const newImages = uploadResults.map((result) => result.secure_url);

    const images = [...existingImages, ...newImages];

    const product = await Product.findByIdAndUpdate(id, { name, status, categoryID, price, images }, { new: true });
    res.send({ product: product, message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Error deleting product", error });
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const filter = req.query.filter || "";
  const status = req.query.status || "";
  const storeID = req.query.storeID;
  const filterCondition = { name: { $regex: filter, $options: "i" } };
  if (status !== "") filterCondition.status = status;
  try {
    const totalProducts = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $match: {
          "category.storeID": new mongoose.Types.ObjectId(storeID),
          ...filterCondition,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    const totalPages = Math.ceil(totalProducts[0].count / perPage) || 1;
    const skip = (page - 1) * perPage;
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $match: {
          "category.storeID": new mongoose.Types.ObjectId(storeID),
          ...filterCondition,
        },
      },
    ])
      .skip(skip)
      .limit(perPage);
    res.send({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products for store:", error);
    res.send(error);
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct };
