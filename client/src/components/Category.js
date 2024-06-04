import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Modal from "./Modal";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useStoreID } from "../App";
import { useAuth } from "../util/RoleContext";

function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { storeID } = useContext(useStoreID);
  const auth = useAuth();

  // Modal variables
  const dataModal = {
    msgModal: "Are you sure you want to delete this item?",
    titleModal: "Warning",
    colorModalBtn: "btn-danger",
    textModalBtn: "Delete",
  };

  async function fetchCategories() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/category/?storeID=${storeID}&page=${currentPage}&perPage=${perPage}&filter=${filter}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("#######", res.data.categories);
      setCategories(res.data.categories);
      setTotalPages(res.data.totalPages);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    if (storeID) {
      fetchCategories();
    }
  }, [currentPage, perPage, totalPages, filter, status, storeID]);

  const handleClick = () => {
    navigate("/add-category");
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleEditClick = (id) => {
    navigate(`/edit-category/${id}`);
  };
  return (
    <div className="container ">
      <div className="d-flex justify-content-between mb-5">
        <h2>Categories</h2>
        {auth.role === "admin" && (
          <>
            <div className=" text-end">
              <button type="submit" className="btn btn-primary " onClick={handleClick}>
                Add category
              </button>
            </div>
          </>
        )}
      </div>
      <div className="shadow rounded p-2 ">
        <div className="d-flex justify-content-between gap-2 m-2 ">
          <input
            type="text"
            className="form-control w-50"
            id="filter"
            name="filter"
            value={filter}
            placeholder="Search category ...."
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className=" d-flex gap-2">
            <div>
              <select
                className="form-select"
                aria-label="Default select example"
                name="status"
                id="status"
                defaultValue="0"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center  ">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col" className="d-none d-lg-table-cell">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  </div>
                </th>
                <th scope="col col-3 " className="d-none d-lg-table-cell">
                  Image
                </th>
                <th scope="col col-3">Name</th>
                <th scope="col col-2">Category</th>
                <th scope="col col-1" colSpan="2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    There are no categories available.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td className="align-middle  d-none d-lg-table-cell">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      </div>
                    </td>

                    <td className="align-middle d-none d-lg-table-cell">
                      <div className="">
                        <img src={category.image} className="rounded w-16 " alt={category.image} />
                      </div>
                    </td>
                    <td className="align-middle col-3">{category.name}</td>
                    <td className="align-middle">{category.categoryID ? category.categoryID.name : "-"}</td>
                    <td className="align-middle">{category.status}</td>
                    <td className="align-middle text-center">
                      <div className="d-flex justify-content-evenly">
                        <a className="d-flex align-items-center btn border-0" onClick={() => handleEditClick(category._id)}>
                          <FaPenToSquare className="  " />
                        </a>
                        <a
                          className="d-flex align-items-center btn border-0"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setDeleteItemId(category._id)}
                        >
                          <FaRegTrashCan className="" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Pagination">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {/* Assuming total pages are calculated on the backend and sent in the res */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal dataModal={dataModal} action={() => handleDelete(deleteItemId)} />
    </div>
  );
}

export default Category;
