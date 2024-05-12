const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory, deleteCategory, updateCategory, getOneCategory } = require("../controllers/categoryController");

router.get("/:storeID", getAllCategories);

router.get("/:id", getOneCategory);

router.post("/create", createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

module.exports = router;
