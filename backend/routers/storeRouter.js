const express = require("express");
const router = express.Router();
const { getAllStores, createStore, deleteStore, updateStore, getOneStore } = require("../controllers/storeController");

router.get("/", getAllStores);

router.get("/:id", getOneStore);

router.post("/create", createStore);

router.delete("/:id", deleteStore);

router.put("/:id", updateStore);

module.exports = router;
