const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080; // Choose your desired port
const app = express();
const main = require("./Connection");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const customerRouter = require("./routers/customerRouter");
const orderRouter = require("./routers/orderRouter");
const storeRouter = require("./routers/storeRouter");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

// Define routes
// Add your routes here

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/store", storeRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {};
