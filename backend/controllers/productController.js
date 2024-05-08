const { model } = require("mongoose");
const Product = require("../modules/productModel");

//display all
const getAllProducts = async (req, res) => {
  try {
    let data = await Product.find();
    res.send(data);
  } catch (error) {
    res.send(error);
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
    console.log("testtttttttttt", id, data);
    let product = await Product.findByIdAndUpdate(id, data);
    console.log("testtttttttttt", product);
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
