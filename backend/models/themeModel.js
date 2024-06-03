const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the theme model
const themeSchema = new Schema(
  {
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store", // Reference to the Store model if you have one
    },
    nav: [
      {
        _id: false, // Exclude _id field for subdocuments in the nav array
        index: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the theme model
const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
