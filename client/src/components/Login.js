import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/RoleContext";
import baseURL from "../config";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = useAuth();

  let token, id, name, role;
  let decoded;

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
    return errors;
  };

  async function login(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const data = { email, password };
    try {
      const res = await axios.post(`${baseURL}/user/login/`, data);
      token = res.data.token;
      id = res.data.id;
      name = res.data.name;
      role = res.data.role;
      let storeID;
      if (role !== "staff") {
        const resStoreID = await axios.get(`${baseURL}/store/user/${id}`);
        if (resStoreID.data.length !== 0) {
          storeID = resStoreID.data[0]._id;
          console.log(storeID);
        }
      } else {
        const resStoreID = await axios.get(`${baseURL}/store/${id}`);
        storeID = resStoreID._id;
      }
      localStorage.setItem("storeID", storeID);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      auth.setRole(role);
      console.log("login", auth);
      decoded = jwtDecode(token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({ login: "Invalid email or password" });
    }
  }

  const handleSignup = () => {
    navigate("/signup");
  };
  useEffect(() => {
    localStorage.getItem("token") && navigate("/");
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row bg-light m-3 p-2 rounded-3 p-5">
        <div className="col-md-6 p-0 d-flex justify-content-center align-items-center">
          <img className="img-fluid rounded-3" src="./images/signin.png" alt="Sign In" />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={login} className="d-flex gap-3 flex-column w-100">
            <div className="d-flex flex-column">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input type="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <div className="d-flex justify-content-between fs-6">
              <div>
                <input type="checkbox" className="form-check-input" />
                <label htmlFor="rememberMe" className="ms-2">
                  Remember me
                </label>
              </div>
              <div>
                <small>Forget password</small>
              </div>
            </div>

            {errors.login && <div className="text-danger">{errors.login}</div>}

            <div>
              <input type="submit" value="Login" className="btn btn-lg btn-primary w-100 fs-6" />
            </div>
            <div>
              <input type="button" onClick={handleSignup} value="Sign up" className="btn btn-lg btn-secondary w-100 fs-6" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
