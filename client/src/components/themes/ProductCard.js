import React from "react";
function ProductCard() {
  return (
    <div className="col ps-0">
      <div className="card p-3">
        <div className="card-body position-relative">
          <div className=" position-relative">
            <span class="position-absolute top-0 start-0  badge rounded bg-danger">Sale</span>
            <img src="https://i.ebayimg.com/images/g/WN8AAOSw-jhT~chA/s-l1200.webp" className="card-img-top" alt="..." />
          </div>
          <h5 className="card-title">Category</h5>
          <p className="card-text">Name</p>
          <div className="d-flex justify-content-between align-items-center ">
            <span className="card-text">$13.99</span>
            <a href="#" className="btn btn-primary">
              + Add
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
