const Theme = require("../models/themeModel");

//display theme
const themeData = async (req, res) => {
  try {
    const theme = await Theme.findOne({ storeID: req.params.storeID });
    res.send(theme);
  } catch (error) {
    res.send(error);
  }
};

//update theme
const updateTheme = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    console.log("id", data);
    let theme = await Theme.findByIdAndUpdate(id, data);
    res.send(theme.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { themeData, updateTheme };
