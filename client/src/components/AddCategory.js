import React, { useState } from "react";
import axios from "axios";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");
  const [categoryCategory, setCategoryCategory] = useState("");
  const [categoryPrice, setCategoryPrice] = useState("");
  let storeID;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: categoryName,
        status: categoryStatus,
        category: categoryCategory,
      };

      await axios.post("http://localhost:8080/category/create", data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  const handleCategory = async () => {
    try {
      storeID = "663f96cab533dfb5acc21748";
      setCategoryCategory(await axios.get(`http://localhost:8080/category/${storeID}`));
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Category Name
              </label>
              <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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
                id="categoryCategory"
                value={categoryCategory}
                onChange={(e) => setCategoryCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryPrice"
                value={categoryPrice}
                onChange={(e) => setCategoryPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={0}
                onChange={(e) => setCategoryStatus(e.target.value)}
              >
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

export default AddCategory;
