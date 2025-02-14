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
import AddEditProduct from "./components/AddEditProduct";
import Navbar from "./components/Navbar";
import AddStore from "./components/AddStore";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import InitialRoute from "./utils/InitialRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./components/Store";
import AddTeam from "./components/AddTeam";
import AddEditCategory from "./components/AddEditCategory";
import RoleRoutes from "./utils/RoleRoutes";
import { AuthProvider } from "./contexts/RoleContext";
import Themes from "./components/Themes";
import { ThemeProvider } from "./contexts/ThemeContext";
import UnderConstractor from "./components/UnderConstractor";
import PasswordReset from "./components/PasswordReset";
export const useStoreID = createContext();

function App() {
  const [storeID, setStoreID] = useState(null);

  const isStorePath = window.location.pathname.split("/")[1] === "store";
  const name = window.location.pathname.split("/")[2];
  useEffect(() => {
    if (localStorage.getItem("storeID")) {
      setStoreID(localStorage.getItem("storeID"));
    }
  }, []);
  return (
    <useStoreID.Provider value={{ storeID, setStoreID }}>
      <AuthProvider>
        {isStorePath ? (
          <Store name={name} />
        ) : (
          <Router>
            <ToastContainer />
            <div className="d-lg-flex">
              {storeID && <Sidebar />}
              <div className=" d-flex  gap-5 flex-grow-1 custom-w-80 flex-column ">
                {storeID && <Navbar />}

                <div className={storeID && "contentBlock"}>
                  <Routes>
                    <Route element={<ProtectedRoutes />}>
                      <Route element={<InitialRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route element={<RoleRoutes />}>
                          <Route path="/add-product" element={<AddEditProduct />} />
                          <Route path="/edit-product/:id" element={<AddEditProduct />} />
                          <Route path="/add-category" element={<AddEditCategory />} />
                          <Route path="/edit-category/:id" element={<AddEditCategory />} />
                          <Route path="/navigation" element={<UnderConstractor />} />
                          <Route path="/pages" element={<UnderConstractor />} />
                          <Route path="/team" element={<AddTeam />} />
                          <Route path="/domaine" element={<UnderConstractor />} />
                          <Route
                            path="/themes"
                            element={
                              <ThemeProvider>
                                <Themes />
                              </ThemeProvider>
                            }
                          />
                        </Route>
                      </Route>
                      <Route element={<RoleRoutes />}>
                        <Route path="/add-store" element={<AddStore />} />
                      </Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/store/:name" element={<Store />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="*" element={<Signup />} />
                  </Routes>
                </div>
              </div>
            </div>
          </Router>
        )}
      </AuthProvider>
    </useStoreID.Provider>
  );
}

export default App;
