const { model } = require("mongoose");
const User = require("../modules/userModel");

//display all
const getAllUsers = async (req, res) => {
  try {
    let names = await User.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//display one user
const getOneUser = async (req, res) => {
  try {
    let names = await User.findOne({ email: req.params.email });
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//Create new User
const createUser = async (req, res) => {
  try {
    let users = req.body;
    await User.create(users);
    let names = await User.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let user = await User.findByIdAndUpdate(id, data);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    let names = await User.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser, getOneUser };
