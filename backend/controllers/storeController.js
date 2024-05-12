const { model } = require("mongoose");
const Store = require("../modules/storeModel");

//display all
const getAllStores = async (req, res) => {
  try {
    let names = await Store.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//display one store
const getOneStore = async (req, res) => {
  try {
    let names = await Store.findById(req.params.id);
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//display User store #####
const getUserStore = async (req, res) => {
  try {
    let userID = req.params.user;
    const stores = await Store.find({ userID });
    res.send(stores);
  } catch (error) {
    res.send(error);
  }
};

//Create new Store
const createStore = async (req, res) => {
  try {
    let stores = req.body;
    await Store.create(stores);
    let names = await Store.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//Update store
const updateStore = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let store = await Store.findByIdAndUpdate(id, data);
    res.send(store);
  } catch (error) {
    res.send(error);
  }
};

//Delete store
const deleteStore = async (req, res) => {
  try {
    let id = req.params.id;
    await Store.findByIdAndDelete(id);
    let names = await Store.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllStores, createStore, deleteStore, updateStore, getOneStore, getUserStore };
