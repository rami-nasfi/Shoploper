const mongoose = require("mongoose");

//schema
let productSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    category: String,
    price: String,

    owner: { type: mongoose.Schema.ObjectId, ref: "store" },
  },
  { timestamps: true }
);

//model
const Product = mongoose.model("product", productSchema);

module.exports = Product;
