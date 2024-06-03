const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

// Display all products
const getAllProducts = async (req, res) => {
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
    console.log(req.body);
    const id = req.params.id;
    let existingImages = req.body.images || [];
    const { name, status, categoryID, price } = req.body;

    console.log("existingImages", existingImages);
    if (!Array.isArray(existingImages)) {
      existingImages = [existingImages];
    }
    const uploadPromises = req.files.map((file) => cloudinary.uploader.upload(file.path));
    const uploadResults = await Promise.all(uploadPromises);
    console.log("uploadResults", uploadResults);

    const newImages = uploadResults.map((result) => result.secure_url);
    console.log(newImages);

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

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct };
