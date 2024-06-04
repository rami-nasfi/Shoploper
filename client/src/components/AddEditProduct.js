import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dropzone from "./Dropzone";
import { useStoreID } from "../App";

function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use this to get the product id from the URL
  const [productName, setProductName] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCat, setProductCat] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const { storeID } = useContext(useStoreID);
  console.log("storeID", storeID);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/product/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const product = res.data;
          setProductName(product.name);
          setProductStatus(product.status);
          setProductCategory(product.categoryID);
          setProductPrice(product.price);
          setProductImages(product.images || []);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("status", productStatus);
      formData.append("categoryID", productCategory);
      formData.append("price", productPrice);

      productImages.forEach((image) => {
        formData.append(`images`, image);
      });
      console.log(...formData);
      if (id) {
        let res = await axios.put(`${process.env.REACT_APP_BACKEND_API}/product/${id}`, formData, {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(res.data.message, {
          autoClose: 3000,
        });
      } else {
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/product/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(res.data.message, {
          autoClose: 3000,
        });
      }

      navigate("/product");
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  useEffect(() => {
    const handleCategory = async () => {
      try {
        let res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/select/${storeID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("res.data ######", res.data);
        setProductCat(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (storeID) {
      handleCategory();
    }
  }, [storeID]);

  const handleFilesChange = (newFiles) => {
    setProductImages(newFiles);
  };

  return (
    <div className="container">
      <div className="mb-5">
        <h2>Add New Product</h2>
      </div>
      <div className=" d-flex justify-content-center align-items-center shadow rounded p-2 ">
        <form onSubmit={handleSubmit} className="container mt-3">
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
                <select className="form-select" id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
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
                <input
                  type="text"
                  className="form-control"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column mb-3">
                <label htmlFor="productStatus" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                >
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
                <Dropzone className="p-5 border text-center rounded" onFilesChange={handleFilesChange} existingImages={productImages} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" id="liveToastBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditProduct;
