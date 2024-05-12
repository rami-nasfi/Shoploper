import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import axios from "axios";
import { FaUser, FaUserGroup, FaFileInvoiceDollar, FaFolderOpen, FaTag, FaChartPie, FaShop } from "react-icons/fa6";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("0");

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  async function userStore() {
    const user = localStorage.getItem("id");
    let res = await axios.get(`http://localhost:8080/store/user/${user}`);
    console.log(res.data);
    setStores(res.data);
  }

  useEffect(() => {
    userStore();
  }, []);

  return (
    <>
      <div className=" w-20 vh-100 overflow-auto">
        <ul className="nav nav-pills d-flex flex-column justify-content-between p-3 position-fixed text-bg-light w-20 vh-100 overflow-auto">
          <div>
            <div>
              <li className="nav-item mb-3">
                <select className="form-select" aria-label="Default select example" defaultValue={0} onClick={() => userStore()}>
                  <option value="0">Store</option>
                  {stores.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </li>
            </div>
            <div className="mb-3">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link d-flex align-items-center ${activeLink === "Dashboard" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("Dashboard")}
                >
                  <FaChartPie className="me-2" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/product"
                  className={`nav-link d-flex align-items-center ${activeLink === "Product" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("Product")}
                >
                  <FaTag className="me-2" />
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/category"
                  className={`nav-link d-flex align-items-center ${activeLink === "Category" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("Category")}
                >
                  <FaFolderOpen className="me-2" />
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/order"
                  className={`nav-link d-flex align-items-center ${activeLink === "Order" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("Order")}
                >
                  <FaFileInvoiceDollar className="me-2" />
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/customer"
                  className={`nav-link d-flex align-items-center ${activeLink === "Customer" ? "active" : ""}`}
                  onClick={() => handleSetActiveLink("Customer")}
                >
                  <FaUserGroup className="me-2" />
                  Customer
                </Link>
              </li>
            </div>
            <div>
              <li className="nav-item ">
                <Link
                  to="/themes"
                  className={`nav-link d-flex align-items-center dropdown-toggle ${activeLink === "Themes" ? "" : ""}`}
                  onClick={() => handleSetActiveLink("Themes")}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <FaShop className="me-2" />
                  Online Shop
                </Link>
              </li>
              <div className="collapse" id="collapseExample">
                <li className="nav-item ">
                  <Link to="/themes" className={`nav-link ${activeLink === "Themes" ? "active" : ""}`} onClick={() => handleSetActiveLink("Themes")}>
                    Themes
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/pages" className={`nav-link ${activeLink === "Pages" ? "active" : ""}`} onClick={() => handleSetActiveLink("Pages")}>
                    Pages
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    to="/navigation"
                    className={`nav-link ${activeLink === "Navigation" ? "active" : ""}`}
                    onClick={() => handleSetActiveLink("Navigation")}
                  >
                    Navigation
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    to="/domaine"
                    className={`nav-link ${activeLink === "Domaine" ? "active" : ""}`}
                    onClick={() => handleSetActiveLink("Domaine")}
                  >
                    Domaine
                  </Link>
                </li>
              </div>
            </div>
          </div>
          <div>
            <li className="nav-item ">
              <Link
                to="/profile"
                className={`nav-link d-flex align-items-center ${activeLink === "Profile" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Profile")}
              >
                <FaUser className="me-2" />
                {localStorage.getItem("name")}
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
