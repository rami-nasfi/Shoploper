import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]{2,})?$/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!name || name.length < 3) {
      errors.name = "Name is required";
    }
    return errors;
  };
  async function signup(e) {
    e.preventDefault();
    let data = {
      name,
      email,
      password,
    };
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log(data);
    let res = await axios.post(`http://localhost:8080/user/signup`, data);
    navigate("/login");
    console.log(res);
  }
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row bg-light m-3 p-2 rounded-3 p-5">
          <div className="col-md-6 p-0 d-flex justify-content-center align-items-center">
            <img className="img-fluid rounded-3 " src="./images/signin.png" alt="" />
          </div>
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
            <form onSubmit={signup} className="d-flex gap-3 flex-column w-100">
              <div className="d-flex flex-column">
                <label htmlFor="" className="mb-1">
                  Name
                </label>
                <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="" className="mb-1">
                  Email
                </label>
                <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="" className="mb-1">
                  Password
                </label>
                <input type="text" className="form-control " name="password" onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div>
                <input type="submit" value="Sign up" className="btn btn-lg btn-primary w-100 fs-6" />
              </div>
              <div>
                <input type="button" onClick={handleLogin} value="Login" className="btn btn-lg btn-secondary w-100 fs-6" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
