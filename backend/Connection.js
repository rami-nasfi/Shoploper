const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/shoploper";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(URI);
}

module.exports = main;
