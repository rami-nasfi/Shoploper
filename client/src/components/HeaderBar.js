import React from "react";

function HeaderBar() {
  return (
    <div className="container d-flex  justify-content-end mb-5 blur">
      <div className="position-fixed ">
        <div className="d-flex justify-content-center align-content-center">
          <img src="../images/signin.png" alt="" className="rounded-circle " style={{ width: "48px", height: "48px" }} />
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
