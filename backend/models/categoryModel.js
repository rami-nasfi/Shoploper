const mongoose = require("mongoose");

//schema
let categorySchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    status: String,
    categoryID: { type: mongoose.Schema.ObjectId, ref: "category" },
    storeID: { type: mongoose.Schema.ObjectId, ref: "store" },
  },
  { timestamps: true }
);

//model
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
