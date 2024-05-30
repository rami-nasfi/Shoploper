import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Sidebar.css";
import axios from "axios";
import baseURL from "../config";
import { FaUser, FaUserGroup, FaFileInvoiceDollar, FaFolderOpen, FaTag, FaChartPie, FaShop, FaBars } from "react-icons/fa6";
import { useStoreID } from "../App";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";
import { useAuth } from "../util/RoleContext";

function Sidebar({ setIsAuthenticated }) {
  const [activeLink, setActiveLink] = useState("Home");
  const [stores, setStores] = useState([]);
  const { storeID, setStoreID } = useContext(useStoreID);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
    closeOffcanvas();
  };
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasSidebar");
    const bsOffcanvas = bootstrapBundleMin.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  };
  async function userStore() {
    const userID = localStorage.getItem("id");

    try {
      // Get user details to check the role
      let userRes = await axios.get(`${baseURL}/user/${userID}`);
      const userRole = userRes.data.role; // Assuming the user data has a role field
      let storeRes;
      if (userRole !== "staff") {
        storeRes = await axios.get(`${baseURL}/store/user/${userID}`);
        setStores(storeRes.data);
      } else {
        let storeID = userRes.data.storeID;
        storeRes = await axios.get(`${baseURL}/store/staff/${storeID}`);
        setStores([storeRes.data]);
      }

      if (!localStorage.getItem("storeID")) {
        setStoreID(stores[0]._id);
        localStorage.setItem("storeID", stores[0]._id);
      } else {
        setStoreID(localStorage.getItem("storeID"));
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  }

  useEffect(() => {
    auth.setRole(localStorage.getItem("role"));

    userStore();
  }, []);

  const handleChange = (e) => {
    setStoreID(e.target.value);
    localStorage.setItem("storeID", e.target.value);
  };
  const handleLogout = () => {
    localStorage.clear();
    auth.setRole(null);
    setIsAuthenticated(false);
    navigate("/login");
  };
  useEffect(() => {
    if (storeID) {
      console.log("Store ID has been set:", storeID);
    }
  }, [storeID]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-end m-1">
        <button
          className="btn btn-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <FaBars />
        </button>
      </div>

      <div className="offcanvas-lg offcanvas-start d-lg-flex flex-column vh-100 overflow-y-auto  " tabIndex="-1" id="offcanvasSidebar">
        <div className="offcanvas-header d-lg-none">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            Sidebar
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          ></button>
        </div>
        <div className="offcanvas-body p-3 flex-grow-1">
          <ul className="nav nav-pills flex-column w-100">
            <li className="nav-item mb-3">
              <div>
                <img src="./logo.png" alt="" style={{ width: "100%" }} />
              </div>
            </li>
            <li className="nav-item mb-3">
              <select className="form-select" aria-label="Store select" onChange={handleChange} value={storeID}>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/"
                className={`nav-link d-flex align-items-center ${activeLink === "Dashboard" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Dashboard")}
              >
                <FaChartPie className="me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/product"
                className={`nav-link d-flex align-items-center ${activeLink === "Product" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Product")}
              >
                <FaTag className="me-2" />
                Product
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/category"
                className={`nav-link d-flex align-items-center ${activeLink === "Category" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Category")}
              >
                <FaFolderOpen className="me-2" />
                Category
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/order"
                className={`nav-link d-flex align-items-center ${activeLink === "Order" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Order")}
              >
                <FaFileInvoiceDollar className="me-2" />
                Order
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/customer"
                className={`nav-link d-flex align-items-center ${activeLink === "Customer" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Customer")}
              >
                <FaUserGroup className="me-2" />
                Customer
              </Link>
            </li>

            {auth.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link d-flex align-items-center dropdown-toggle `}
                    data-bs-toggle="collapse"
                    data-bs-target="#onlineShopMenu"
                    aria-expanded="false"
                    aria-controls="onlineShopMenu"
                  >
                    <FaShop className="me-2" />
                    Online Shop
                  </Link>
                </li>
                <div className="collapse" id="onlineShopMenu">
                  <li className="nav-item">
                    <Link
                      to="/themes"
                      className={`nav-link ${activeLink === "Themes" ? "active" : ""}`}
                      onClick={() => handleSetActiveLink("Themes")}
                    >
                      Themes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pages" className={`nav-link ${activeLink === "Pages" ? "active" : ""}`} onClick={() => handleSetActiveLink("Pages")}>
                      Pages
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/navigation"
                      className={`nav-link ${activeLink === "Navigation" ? "active" : ""}`}
                      onClick={() => handleSetActiveLink("Navigation")}
                    >
                      Navigation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/domaine"
                      className={`nav-link ${activeLink === "Domaine" ? "active" : ""}`}
                      onClick={() => handleSetActiveLink("Domaine")}
                    >
                      Domaine
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/team" className={`nav-link ${activeLink === "Team" ? "active" : ""}`} onClick={() => handleSetActiveLink("Team")}>
                      Team
                    </Link>
                  </li>
                </div>
              </>
            )}
            <li className="nav-item mt-3">
              <Link
                className={`nav-link d-flex align-items-center dropdown-toggle ${activeLink === "Profile" ? "active" : ""}`}
                onClick={() => handleSetActiveLink("Profile")}
                data-bs-toggle="collapse"
                data-bs-target="#profileMenu"
                aria-expanded="false"
                aria-controls="profileMenu"
              >
                <FaUser className="me-2" />
                {localStorage.getItem("name")}
              </Link>
            </li>
            <div className="collapse" id="profileMenu">
              <li className="nav-item">
                <Link className="nav-link" onClick={() => handleLogout()}>
                  Logout
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
