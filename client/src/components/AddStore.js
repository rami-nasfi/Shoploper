import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStore() {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8080/store/create", { name: storeName, userID: localStorage.getItem("id") });
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/add-product");
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
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <span class="input-group-text" id="basic-addon2">
                  .shoploper.com
                </span>
              </div>
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
