import React from "react";
import ProductCard from "./ProductCard";

function ProductListCard() {
  return (
    <div className="">
      <h2 className="">Featured Products</h2>
      <div className="row g-4 row-cols-lg-4 row-cols-2 row-cols-md-3 mx-0">
        {[...Array(8)].map((x, i) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
}

export default ProductListCard;
