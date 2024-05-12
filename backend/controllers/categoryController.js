const { model } = require("mongoose");
const Category = require("../modules/categoryModel");

//display all
const getAllCategories = async (req, res) => {
  try {
    let storeID = req.params.storeID;
    let data = await Category.find({ storeID });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

//display one category
const getOneCategory = async (req, res) => {
  try {
    let category = await Category.findOne({ id: req.params.id });
    res.send(category);
  } catch (error) {
    res.send(error);
  }
};

//Create new Category
const createCategory = async (req, res) => {
  try {
    let category = req.body;
    await Category.create(category);
    let categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
};

//Update category
const updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log("testtttttttttt", id, data);
    let category = await Category.findByIdAndUpdate(id, data);
    console.log("testtttttttttt", category);
    res.send(category);
  } catch (error) {
    res.send(error);
  }
};

//Delete category
const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    await Category.findByIdAndDelete(id);
    let names = await Category.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory, getOneCategory };
