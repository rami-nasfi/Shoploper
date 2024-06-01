const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

const main = require("./Connection");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const customerRouter = require("./routers/customerRouter");
const orderRouter = require("./routers/orderRouter");
const storeRouter = require("./routers/storeRouter");
const verifyToken = require("./middlewares/auth");

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use("/user", userRouter);
app.use("/product", verifyToken, productRouter);
app.use("/category", verifyToken, categoryRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/store", storeRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {};
