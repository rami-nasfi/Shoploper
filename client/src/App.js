import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sidebar from "./components/Sidebar";
import Product from "./components/Product";
import Home from "./components/Home";
import Order from "./components/Order";
import Customer from "./components/Customer";
import HeaderBar from "./components/HeaderBar";
import Category from "./components/Category";
import AddProduct from "./components/AddProduct";
import AddStore from "./components/AddStore";

function App() {
  return (
    <Router>
      <Login></Login>
      <Signup></Signup>
      <div className="d-flex">
        <Sidebar></Sidebar>
        <div className=" d-flex flex-column gap-5 flex-grow-1 p-3">
          <HeaderBar></HeaderBar>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/category" element={<Category />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-store" element={<AddStore />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
