import React from "react";
import MainNavigation from "./themes/MainNavigation";
import CarouselImage from "./themes/CarouselImage";
import CategoryListCard from "./themes/CategoryListCard";
import ProductListCard from "./themes/ProductListCard";

const Test = () => {
  return (
    <div className="container d-flex flex-column gap-5 w-80">
      <MainNavigation />
      <CarouselImage />
      <CategoryListCard />
      <ProductListCard />
    </div>
  );
};

export default Test;
