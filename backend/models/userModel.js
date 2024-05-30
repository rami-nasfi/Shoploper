const mongoose = require("mongoose");

//schema
let userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    role: String,
    storeID: { type: mongoose.Schema.ObjectId, ref: "store" },
  },
  { timestamps: true }
);

//model
const User = mongoose.model("user", userSchema);

module.exports = User;
