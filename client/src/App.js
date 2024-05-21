import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
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
import InitialRoute from "./util/InitialRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./components/Store";
import Test from "./components/Test";
import AddTeam from "./components/AddTeam";
import AddCategory from "./components/AddCategory";
export const useStoreID = createContext();

function App() {
  const [storeID, setStoreID] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isStorePath = window.location.pathname.split("/")[1] === "store";
  const name = window.location.pathname.split("/")[2];
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <useStoreID.Provider value={{ storeID, setStoreID }}>
      {isStorePath ? (
        <Store name={name} />
      ) : (
        <Router>
          <ToastContainer />
          <div className="d-lg-flex ">
            {isAuthenticated && <Sidebar />}
            <div className=" d-flex  gap-5 flex-grow-1 mt-5">
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route element={<InitialRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/navigation" element={<AddStore />} />
                    <Route path="/pages" element={<AddStore />} />
                    <Route path="/domaine" element={<AddStore />} />
                    <Route path="/themes" element={<Test />} />
                    <Route path="/add-team" element={<AddTeam />} />
                  </Route>
                  <Route path="/add-store" element={<AddStore />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/store/:name" element={<Store />} />

                <Route path="*" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </useStoreID.Provider>
  );
}

export default App;
