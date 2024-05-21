import React from "react";
function CategoryCard() {
  return (
    <div className="ms-0 me-2">
      <div className="card text-center d-flex justify-content-center align-items-center">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <img src="https://freshcart.codescandy.com/assets/images/category/category-dairy-bread-eggs.jpg" alt="" className="mx-auto" />
          <h6 class="card-subtitle mt-2 text-body-secondary ">Category name</h6>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
