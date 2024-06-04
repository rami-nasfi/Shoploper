const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODB_URI;

main()
  .then(() => {})
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(URI);
}

module.exports = main;
