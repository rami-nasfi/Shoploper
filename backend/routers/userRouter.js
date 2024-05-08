const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser, getOneUser } = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:email", getOneUser);

router.post("/create", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

module.exports = router;
