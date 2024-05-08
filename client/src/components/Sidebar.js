import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./css/Sidebar.css";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Home");
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <div className=" w-20 vh-100 ">
        <ul className="nav nav-pills d-flex flex-column p-3 position-fixed text-bg-light w-20 vh-100">
          <li className="nav-item mb-3">
            <select className="form-select" aria-label="Default select example" defaultValue={0}>
              <option value="0">Store</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </li>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${activeLink === "Home" ? "active" : ""}`} onClick={() => handleSetActiveLink("Home")}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`nav-link ${activeLink === "Dashboard" ? "active" : ""}`}
              onClick={() => handleSetActiveLink("Dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product" className={`nav-link ${activeLink === "Product" ? "active" : ""}`} onClick={() => handleSetActiveLink("Product")}>
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/category" className={`nav-link ${activeLink === "Category" ? "active" : ""}`} onClick={() => handleSetActiveLink("Category")}>
              Category
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order" className={`nav-link ${activeLink === "Order" ? "active" : ""}`} onClick={() => handleSetActiveLink("Order")}>
              Order
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/customer" className={`nav-link ${activeLink === "Customer" ? "active" : ""}`} onClick={() => handleSetActiveLink("Customer")}>
              Customer
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
