const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/:id", getOneProduct);

router.post("/create", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

module.exports = router;
