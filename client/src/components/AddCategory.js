import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dropzone from "./Dropzone";
import { useStoreID } from "../App";

function AddEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use this to get the category id from the URL
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");
  const [categoryCategory, setCategoryCategory] = useState("");
  const [categoryCat, setCategoryCat] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const { storeID } = useContext(useStoreID);
  console.log("storeID", storeID);

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const category = res.data;
          setCategoryName(category.name);
          setCategoryStatus(category.status);
          setCategoryCategory(category.categoryID);
          setCategoryImage(category.image || []);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("status", categoryStatus);
      categoryCategory && formData.append("categoryID", categoryCategory);
      formData.append("image", categoryImage[0]);
      formData.append("storeID", storeID);
      console.log(categoryImage[0]);
      if (id) {
        await axios.put(`${process.env.REACT_APP_BACKEND_API}/category/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Category updated successfully!", {
          autoClose: 3000,
        });
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/category/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Category created successfully!", {
          autoClose: 3000,
        });
      }

      navigate("/category");
    } catch (error) {
      console.error("Error adding/updating category:", error);
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
        setCategoryCat(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (storeID) {
      handleCategory();
    }
  }, [storeID]);

  const handleFilesChange = (newFiles) => {
    setCategoryImage(newFiles);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="container">
        <div className="row d-flex justify-content-start">
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="categoryCategory" className="form-label">
                Category
              </label>
              <select className="form-select" id="categoryCategory" value={categoryCategory} onChange={(e) => setCategoryCategory(e.target.value)}>
                {categoryCat && categoryCat.length > 0 ? (
                  <>
                    <option value="0">Select a category</option>
                    {categoryCat.map((category) => (
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
              <label htmlFor="categoryStatus" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={categoryStatus}
                onChange={(e) => setCategoryStatus(e.target.value)}
              >
                <option value="0">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="categoryImage" className="form-label">
                Image
              </label>
              <Dropzone className="p-5 border text-center rounded" onFilesChange={handleFilesChange} existingImage={categoryImage} />
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

export default AddEditCategory;
