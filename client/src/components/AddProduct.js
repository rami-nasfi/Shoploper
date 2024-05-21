import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dropzone from "./Dropzone";
import { useStoreID } from "../App";

function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCat, setProductCat] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const { storeID } = useContext(useStoreID);
  console.log("storeID", storeID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("status", productStatus);
      formData.append("categoryID", productCategory);
      formData.append("price", productPrice);
      productImages.forEach((image) => {
        formData.append("images", image);
      });

      const res = await axios.post("http://localhost:8080/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res) {
        handleClick();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const handleCategory = async () => {
      console.log("Fetching categories");
      try {
        let res = await axios.get(`http://localhost:8080/category/${storeID}`);
        console.log("res.data", res.data.categories);
        setProductCat(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (storeID) {
      handleCategory();
    }
  }, [storeID]);

  const handleClick = () => {
    navigate("/product");
    toast.success("Product created successfully!", {
      autoClose: 3000,
    });
  };

  const handleFilesChange = (newFiles) => {
    setProductImages(newFiles);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="productCategory" className="form-label">
                Category
              </label>
              <select className="form-select" id="productCategory" onChange={(e) => setProductCategory(e.target.value)}>
                {productCat && productCat.length > 0 ? (
                  <>
                    <option value="0">Select a category</option>
                    {productCat.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input type="text" className="form-control" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="productStatus" className="form-label">
                Status
              </label>
              <select className="form-select" aria-label="Default select example" defaultValue={0} onChange={(e) => setProductStatus(e.target.value)}>
                <option value="0">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="productImages" className="form-label">
                Images
              </label>
              <Dropzone className="p-5  border text-center rounded" onFilesChange={handleFilesChange} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" id="liveToastBtn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
