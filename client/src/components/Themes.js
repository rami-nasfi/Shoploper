import React from "react";
import MainNavigation from "./themes/MainNavigation";
import CarouselImage from "./themes/CarouselImage";
import CategoryListCard from "./themes/CategoryListCard";
import ProductListCard from "./themes/ProductListCard";

function Themes() {
  return (
    <div className="container ">
      <div className="d-flex flex-column gap-5">
        <MainNavigation />
        <CarouselImage />
        <CategoryListCard />
        <ProductListCard />
      </div>
    </div>
  );
}

export default Themes;
