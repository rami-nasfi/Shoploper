const mongoose = require("mongoose");

//schema
let orderSchema = new mongoose.Schema(
  {
    name: String,
    amount: String,
    status: String,

    owner: { type: mongoose.Schema.ObjectId, ref: "customer" },
  },
  { timestamps: true }
);

//model
const Order = mongoose.model("order", orderSchema);

module.exports = Order;
