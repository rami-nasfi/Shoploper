const mongoose = require("mongoose");

//schema
let storeSchema = new mongoose.Schema(
  {
    name: String,
    userID: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

//model
const Store = mongoose.model("store", storeSchema);

module.exports = Store;
