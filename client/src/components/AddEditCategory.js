import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dropzone from "./Dropzone";
import { useStoreID } from "../App";
import { FaPen } from "react-icons/fa6";

function AddEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Use this to get the category id from the URL
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");
  const [categoryCategory, setCategoryCategory] = useState("");
  const [categoryCat, setCategoryCat] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("https://res.cloudinary.com/dibvexzpm/image/upload/v1717191220/f3iwia3h4xuzn2ivezgx.png");
  const { storeID } = useContext(useStoreID);
  console.log("storeID", storeID);

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const category = res.data;
          setCategoryName(category.name);
          setCategoryStatus(category.status);
          setCategoryCategory(category.categoryID);
          setCategoryImage(category.image);
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
      formData.append("image", categoryImage);
      categoryCategory && formData.append("categoryID", categoryCategory);
      formData.append("storeID", storeID);
      console.log("formData", ...formData);

      if (id) {
        await axios.put(`${process.env.REACT_APP_BACKEND_API}/category/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Category updated successfully!", {
          autoClose: 3000,
        });
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/category/create`, formData, {
          headers: {
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

  function handleImage(event) {
    if (event.target.files[0]) {
      setCategoryImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  return (
    <div className="container">
      <div className="mb-5">
        <h2>Add New Category</h2>
      </div>
      <div className=" d-flex justify-content-center align-items-center shadow rounded p-2 ">
        <form onSubmit={handleSubmit} className="container mt-3">
          <div className="row d-flex justify-content-start">
            <div className="col-md-12 ">
              <div className="position-relative custom-fit-content mb-3 border rounded-2 wh-10">
                <input type="file" id="fileInput" className="d-none" onChange={handleImage} />
                <label
                  htmlFor="fileInput"
                  className="rounded-circle position-absolute bg-light d-flex justify-content-center align-items-center badge-edit btn border-0"
                >
                  <FaPen />
                </label>
                <img src={id && typeof categoryImage === "string" ? categoryImage : selectedFile} alt="" className="rounded-4 wh-10" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
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
                      {categoryCat.map((category) => {
                        if (id !== category._id)
                          return (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          );
                      })}
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
          </div>
          <button type="submit" className="btn btn-primary" id="liveToastBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditCategory;
