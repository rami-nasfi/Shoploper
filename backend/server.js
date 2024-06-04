const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const server = express();

const main = require("./Connection");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const customerRouter = require("./routers/customerRouter");
const orderRouter = require("./routers/orderRouter");
const storeRouter = require("./routers/storeRouter");
const themeRouter = require("./routers/themeRouter");
const verifyToken = require("./middlewares/auth");

// Middleware
server.use(express.json());
server.use(cors());

// Define routes
server.use("/user", userRouter);
server.use("/product", verifyToken, productRouter);
server.use("/category", verifyToken, categoryRouter);
server.use("/order", orderRouter);
server.use("/customer", customerRouter);
server.use("/store", storeRouter);
server.use("/theme", themeRouter);

// Start the server
server.listen(PORT, () => {});

module.exports = {};
