const { model } = require("mongoose");
const Category = require("../models/categoryModel");

// Display all categories
const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const filter = req.query.filter || "";
  const status = req.query.status || "";
  const storeID = req.query.storeID;

  try {
    const filterCondition = { name: { $regex: filter, $options: "i" } };
    if (status !== "") filterCondition.status = status;
    const totalCategories = await Category.find(filterCondition).countDocuments();
    const totalPages = Math.ceil(totalCategories / perPage) || 1;
    const skip = (page - 1) * perPage;
    const categories = await Category.find(filterCondition).skip(skip).limit(perPage).populate({
      path: "categoryID",
    });
    console.log("##########################", categories);
    res.send({ categories, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories", error });
  }
};

//display all
const getAllCat = async (req, res) => {
  try {
    let categories = await Category.find({ storeID: req.params.storeID });
    res.send({ categories });
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
    console.log(category);
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
    let category = await Category.findByIdAndUpdate(id, data);
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

module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory, getOneCategory, getAllCat };
