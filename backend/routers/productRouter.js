const express = require("express");
const upload = require("../middlewares/upload");
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/create", upload.array("images", 10), createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.array("images", 10), updateProduct);

module.exports = router;
