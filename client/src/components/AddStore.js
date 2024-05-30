import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../config";
import { useNavigate } from "react-router-dom";

function AddStore() {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!storeName) {
      errors.storeName = "Store name is required";
    } else if (!/^(?!-)(?!.*--)[A-Za-z0-9-]{1,63}(?<!-)$/.test(storeName)) {
      errors.storeName = "Store name is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      let check = await axios.get(`${baseURL}/store/name/${storeName}`);
      if (check.data.length > 0) {
        errors.storeName = "Store name not available";
        setErrors(errors);
      }
      let res = await axios.post(`${baseURL}/store/create`, { name: storeName, userID: localStorage.getItem("id") });
      console.log("resssssss", res.data.length);
      let storeID = res.data[res.data.length - 1]._id;
      localStorage.setItem("storeID", storeID);
      if (res.status === 200) handleClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-75">
      <form className="container" onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center ">
          <div className="col-md-6">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="" className="form-label">
                Store Name
              </label>
              <div class="input-group ">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  id="storeName"
                  placeholder="Please write your store name"
                  onChange={(e) => {
                    setErrors({});
                    setStoreName(e.target.value);
                  }}
                />
                <span class="input-group-text" id="basic-addon2">
                  .shoploper.com
                </span>
              </div>
              {errors.storeName && <small className="text-danger">{errors.storeName}</small>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStore;
