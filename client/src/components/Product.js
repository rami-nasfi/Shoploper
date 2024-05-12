import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Modal variables
  const dataModal = {
    msgModal: "Are you sure you want to delete this item?",
    titleModal: "Warning",
    colorModalBtn: "btn-danger",
    textModalBtn: "Delete",
  };

  async function fetchProducts() {
    try {
      const res = await axios.get(`http://localhost:8080/product/?page=${currentPage}&perPage=${perPage}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      console.log("totalPages here:", totalPages);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [currentPage, perPage, totalPages]);

  const handleClick = () => {
    navigate("/add-product");
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div className="container ">
      <div className="d-flex justify-content-between mb-5">
        <h2>Products</h2>
        <div className=" text-end">
          <button type="submit" className="btn btn-primary " onClick={handleClick}>
            Add product
          </button>
        </div>
      </div>
      <div className="border rounded p-2 ">
        <div className="d-flex justify-content-between gap-2 m-2 ">
          <input type="text" className="form-control w-50" placeholder="Search product ...." />
          <div className=" d-flex gap-2">
            <div>
              <select className="form-select" aria-label="Default select example" defaultValue="0">
                <option value="0">Status</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center  ">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col" className="">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  </div>
                </th>
                <th scope="col" className="col-1">
                  {products.image}
                </th>
                <th scope="col col-3">Name</th>
                <th scope="col col-2">Category</th>
                <th scope="col col-1">Price</th>
                <th scope="col col-1" colSpan="2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    There are no products available.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="align-middle">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="">
                        <img src={product.image} className="rounded w-16" alt={product.name} />
                      </div>
                    </td>
                    <td className="align-middle col-3">{product.name}</td>
                    <td className="align-middle">{product.categoryID.name}</td>
                    <td className="align-middle">{product.price}</td>
                    <td className="align-middle">{product.status}</td>
                    <td className="align-middle text-center">
                      <div className="d-flex justify-content-evenly">
                        <a href="" className="d-flex align-items-center">
                          <FaPenToSquare className="  " />
                        </a>
                        <a
                          href=""
                          className="d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setDeleteItemId(product._id)}
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

export default Product;
