const express = require("express");
const router = express.Router();
const { getAllStores, createStore, deleteStore, updateStore, getStoreById, getStoreByName, getUserStore } = require("../controllers/storeController");

router.get("/", getAllStores);

router.get("/:id", getStoreById);

router.get("/user/:userID", getUserStore);

router.post("/create", createStore);

router.delete("/:id", deleteStore);

router.put("/:id", updateStore);

module.exports = router;
