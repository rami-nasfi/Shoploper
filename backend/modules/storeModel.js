const mongoose = require("mongoose");

//schema
let storeSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

//model
const Store = mongoose.model("store", storeSchema);

module.exports = Store;
