import React from "react";
import { FaBagShopping, FaCommentDollar, FaUserGroup } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="row mt-5">
        <div className="col-md-4 ">
          <div className="border rounded p-4 ">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4>Earnings</h4>
              <FaCommentDollar style={{ fontSize: "1.5em" }} />
            </div>
            <h4>$99,999.99</h4>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="border rounded p-4 ">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4>Orders</h4>
              <FaBagShopping style={{ fontSize: "1.5em" }} />
            </div>
            <h4>$47,021</h4>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="border rounded p-4 ">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h4>Customers</h4>
              <FaUserGroup style={{ fontSize: "1.5em" }} />
            </div>
            <h4>34,184</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
