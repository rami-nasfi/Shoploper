const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser, getOneUser, loginUser, signupUser } = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:email", getOneUser);

router.post("/create", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.post("/login", loginUser);

router.post("/signup", signupUser);

module.exports = router;
