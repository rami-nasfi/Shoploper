import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:8080/product/");
        console.log("first");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleClick = () => {
    navigate("/add-product");
  };
  return (
    <div className="container ">
      <div className="d-flex justify-content-between mb-5">
        <h2>Products</h2>
        <div className=" text-end">
          <button type="submit" class="btn btn-primary " onClick={handleClick}>
            Add product
          </button>
        </div>
      </div>
      <div className="border rounded p-2 ">
        <div className="d-flex justify-content-between gap-2 m-2 ">
          <input type="text" className="form-control w-50" placeholder="Search product ...." />
          <div className=" d-flex gap-2">
            <div>
              <select class="form-select" aria-label="Default select example">
                <option selected>Status</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center  ">
          <table class="table table-striped ">
            <thead>
              <tr>
                <th scope="col" className="">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  </div>
                </th>
                <th scope="col" className="col-1">
                  {products.image}
                </th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col" colSpan="3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="align-middle">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                  </td>
                  <td className="align-middle">
                    <div class="">
                      <img src={product.image} class="rounded w-16" alt={product.name} />
                    </div>
                  </td>
                  <td className="align-middle">{product.name}</td>
                  <td className="align-middle">{product.category}</td>
                  <td className="align-middle">{product.price}</td>
                  <td className="align-middle">
                    <Link to={`/product/${product.id}`}>U</Link>
                  </td>
                  <td className="align-middle">
                    <a href="">X</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="...">
          <ul class="pagination justify-content-end">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item active" aria-current="page">
              <span class="page-link">2</span>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Product;
