const express = require("express");
const router = express.Router();
const { themeData, updateTheme } = require("../controllers/themeController");

router.get("/:storeID", themeData);
router.post("/update/:id", updateTheme);

module.exports = router;
