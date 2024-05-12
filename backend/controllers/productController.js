const { model } = require("mongoose");
const Product = require("../modules/productModel");

//display all
const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    const skip = (page - 1) * perPage;
    const products = await Product.find().skip(skip).limit(perPage).populate("categoryID");
    console.log(totalPages);
    res.send({ products, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error: error });
  }
};

//display one product
const getOneProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ id: req.params.id });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

//Create new Product
const createProduct = async (req, res) => {
  try {
    let product = req.body;
    console.log(product);
    await Product.create(product);
    let products = await Product.find();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

//Update product
const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let product = await Product.findByIdAndUpdate(id, data);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

//Delete product
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    await Product.findByIdAndDelete(id);
    let names = await Product.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct };
