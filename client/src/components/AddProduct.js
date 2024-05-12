import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCat, setProductCat] = useState([]);
  let storeID;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: productName,
        status: productStatus,
        categoryID: productCategory,
        price: productPrice,
      };
      console.log(data);
      await axios.post("http://localhost:8080/product/create", data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  useEffect(() => {
    const handleCategory = async () => {
      try {
        storeID = "663f96cab533dfb5acc21748";
        let productCat = await axios.get(`http://localhost:8080/category/${storeID}`);
        setProductCat(productCat.data);
        console.log(productCat);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };
    handleCategory();
  }, []);

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
              <select className="form-control" id="productCategory" onChange={(e) => setProductCategory(e.target.value)}>
                <option value="0">Select a category</option>
                {productCat.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                <option value="0">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
