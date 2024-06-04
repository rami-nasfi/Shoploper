import React from "react";

function PasswordReset() {
  return (
    <div className="container flex-column d-flex justify-content-center align-items-center vh-100">
      <h1>this page under constractor</h1>
      <div className="row bg-light m-3 p-2 rounded-3 p-5 shadow">
        <div className="col-md-6 p-0 d-flex justify-content-center align-items-center">
          <img className="img-fluid rounded-3" src="./images/signin.png" alt="Sign In" />
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <form className="d-flex gap-3 flex-column w-100">
            <div className="d-flex flex-column">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input type="email" className="form-control" name="email" />
              {false && <small className="text-danger"></small>}
            </div>
            <div>
              <input type="submit" value="Reset" className="btn btn-lg btn-primary w-100 fs-6" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
