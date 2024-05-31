const { model } = require("mongoose");
const Store = require("../models/storeModel");

//display all
const getAllStores = async (req, res) => {
  try {
    let names = await Store.find();
    res.send(names);
  } catch (error) {
    res.send(error);
  }
};

//display store by name
const getStoreByName = async (req, res) => {
  try {
    const name = req.params.name;
    const store = await Store.findOne({ name: name });
    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }
    res.status(200).send(store);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

//display store by id
const getStoreById = async (req, res) => {
  try {
    const id = req.params.id;
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }
    res.status(200).send(store);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

//display User store #####
const getUserStore = async (req, res) => {
  try {
    let userID = req.params.userID;
    const stores = await Store.find({ userID });
    res.send(stores);
  } catch (error) {
    res.send(error);
  }
};

//Create new Store
const createStore = async (req, res) => {
  try {
    let { name, userID } = req.body;
    if (!name) {
      return res.status(500).send({ errorMsg: "Fill the required information" });
    }
    const isReserved = await Store.find({ name });
    console.log(isReserved.length);
    if (isReserved.length > 0) {
      return res.status(500).send({ errorMsg: "Name not available" });
    }
    await Store.create({ name, userID });
    let names = await Store.find({ userID });
    res.status(200).send(names);
  } catch (error) {
    res.status(500).send(error);
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

module.exports = { getAllStores, createStore, deleteStore, updateStore, getStoreById, getStoreByName, getUserStore };
