import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let token, id, name;
  let decoded;

  async function login(e) {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    console.log(data);
    let res = await axios.post(`http://localhost:8080/user/login/`, data);
    token = res.data.token;
    id = res.data.id;
    name = res.data.name;
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    decoded = jwtDecode(token);
    navigate("/");
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row bg-light m-3 p-2 rounded-3 p-5">
          <div className="col-md-6 p-0 d-flex justify-content-center align-items-center">
            <img className="img-fluid rounded-3 " src="./images/signin.png" alt="" />
          </div>
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
            <form onSubmit={login} className="d-flex gap-3 flex-column w-100">
              <div className="d-flex flex-column">
                <label htmlFor="" className="mb-1">
                  Email
                </label>
                <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="" className="mb-1">
                  Password
                </label>
                <input type="text" className="form-control " name="password" onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="d-flex justify-content-between fs-6">
                <div>
                  <input type="checkbox" name="" id="" className="form-check-input" />
                  <label htmlFor="" className="ms-2">
                    Remember me
                  </label>
                </div>
                <div>
                  <small>Forget password</small>
                </div>
              </div>

              <div>
                <input type="submit" value="Login" className="btn btn-lg btn-primary w-100 fs-6" />
              </div>
              <div>
                <input type="button" value="Sign up" className="btn btn-lg btn-secondary w-100 fs-6" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
