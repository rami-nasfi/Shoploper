const express = require("express");
const router = express.Router();
const multerUpload = require("../middlewares/multer");
const { getAllCategories, createCategory, deleteCategory, updateCategory, getOneCategory, getAllCat } = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/select/:storeID", getAllCat);

router.get("/:id", getOneCategory);

router.post("/create", multerUpload.single("image"), createCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

module.exports = router;
