const mongoose = require("mongoose");

//schema
let productSchema = new mongoose.Schema(
  {
    images: [String],
    name: String,
    price: String,
    status: String,
    categoryID: { type: mongoose.Schema.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

//model
const Product = mongoose.model("product", productSchema);

module.exports = Product;
