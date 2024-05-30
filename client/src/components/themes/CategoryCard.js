import React from "react";
function CategoryCard() {
  return (
    <div className="ms-0 me-2">
      <div className="card text-center d-flex justify-content-center align-items-center">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://i.etsystatic.com/31406570/r/il/c33ff5/5422370236/il_fullxfull.5422370236_1fu1.jpg"
            alt=""
            className="mx-auto"
            style={{ width: "140px" }}
          />
          <h6 class="card-subtitle mt-2 text-body-secondary ">Category name</h6>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
