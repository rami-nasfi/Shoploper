const mongoose = require("mongoose");

//schema
let categorySchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    category: { type: mongoose.Schema.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

//model
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
