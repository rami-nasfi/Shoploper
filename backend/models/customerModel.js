const mongoose = require("mongoose");

//schema
let customerSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    storeID: { type: mongoose.Schema.ObjectId, ref: "store" },
  },
  { timestamps: true }
);

//model
const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
