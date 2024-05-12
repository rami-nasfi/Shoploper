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
import Dashboard from "./components/Dashboard";
import Order from "./components/Order";
import Customer from "./components/Customer";
import Category from "./components/Category";
import AddProduct from "./components/AddProduct";
import AddStore from "./components/AddStore";
import ProtectedRoutes from "./util/ProtectedRoutes";

function App() {
  return (
    <Router>
      <div className="d-flex">
        {localStorage.getItem("token") ? <Sidebar /> : <></>}
        <div className=" d-flex  gap-5 flex-grow-1 mt-5">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/order" element={<Order />} />
              <Route path="/category" element={<Category />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-store" element={<AddStore />} />
              <Route path="/navigation" element={<AddStore />} />
              <Route path="/pages" element={<AddStore />} />
              <Route path="/domaine" element={<AddStore />} />
              <Route path="/themes" element={<AddStore />} />
            </Route>
            {/* <Route element={<RedirectRoutes />}> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* </Route> */}
            <Route path="*" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
