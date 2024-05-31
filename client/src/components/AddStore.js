import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddStore({ setStoreID }) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!errorMsg) {
      errors.errorMsg = "Store name is required";
    } else if (!/^(?!-)(?!.*--)[A-Za-z0-9-]{1,63}(?<!-)$/.test(errorMsg)) {
      errors.errorMsg = "Store name is invalid";
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
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/store/create`, { name: errorMsg, userID: localStorage.getItem("id") });
      console.log(res);
      let storeID = res.data[res.data.length - 1]._id;
      setStoreID(storeID);
      localStorage.setItem("storeID", storeID);
      handleClick();
    } catch (error) {
      setErrors({ errorMsg: error.response.data.errorMsg });
      console.log("error #  #", error);
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
                  id="errorMsg"
                  placeholder="Please write your store name"
                  onChange={(e) => {
                    setErrors({});
                    setErrorMsg(e.target.value);
                  }}
                />
                <span class="input-group-text" id="basic-addon2">
                  .shoploper.com
                </span>
              </div>
              {errors.errorMsg && <small className="text-danger">{errors.errorMsg}</small>}
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
