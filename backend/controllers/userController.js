const { model } = require("mongoose");
const User = require("../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
require("dotenv").config();

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

//signup user
const signupUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.send({ msg: "Fill the required information" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.send({ msg: "Email already exist please login or register with a new email" });
    }
    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    console.log(hashPassword);
    await User.create({ email, password: hashPassword, name });
    return res.send({ email, hashPassword, name });
  } catch (error) {
    res.send(error);
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "Fill in both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ msg: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ msg: "Invalid email or password" });
    }
    console.log("token");
    let token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET_KEY);
    let id = user.id;
    let name = user.name;
    console.log(token);
    res.send({ msg: "Login successfully", token, id, name });
  } catch (error) {
    res.send(error);
  }
};
module.exports = { getAllUsers, createUser, deleteUser, updateUser, getOneUser, loginUser, signupUser };
