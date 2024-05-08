import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: productName,
        status: productStatus,
        category: productCategory,
        price: productPrice,
      };

      await axios.post("http://localhost:8080/product/create", data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Product Name
              </label>
              <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Price
              </label>
              <input type="text" className="form-control" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Status
              </label>
              <select className="form-select" aria-label="Default select example" defaultValue={0} onChange={(e) => setProductStatus(e.target.value)}>
                <option value="0">Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
