const express = require("express");
const multerUpload = require("../middlewares/multer");
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/create", multerUpload.array("images", 10), createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", multerUpload.array("images", 10), updateProduct);

module.exports = router;
