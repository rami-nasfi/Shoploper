const { model } = require("mongoose");
const Order = require("../models/orderModel");

//display all
const getAllOrders = async (req, res) => {
  try {
    let data = await Order.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

//display one order
const getOneOrder = async (req, res) => {
  try {
    let order = await Order.findOne({ id: req.params.id });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

//Create new Order
const createOrder = async (req, res) => {
  try {
    let order = req.body;
    await Order.create(order);
    let orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};

//Update order
const updateOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log("testtttttttttt", id, data);
    let order = await Order.findByIdAndUpdate(id, data);
    console.log("testtttttttttt", order);
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

//Delete order
const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
    await Order.findByIdAndDelete(id);
    let names = await Order.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllOrders, createOrder, deleteOrder, updateOrder, getOneOrder };
