import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signup(e) {
    e.preventDefault();
    let data = {
      name,
      email,
      password,
    };
    console.log(data);
    let res = await axios.post(`http://localhost:8080/user/signup`, data);

    console.log(res);
  }
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
              </div>
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

              <div>
                <input type="submit" value="Sign up" className="btn btn-lg btn-primary w-100 fs-6" />
              </div>
              <div>
                <input type="button" value="Login" className="btn btn-lg btn-secondary w-100 fs-6" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
