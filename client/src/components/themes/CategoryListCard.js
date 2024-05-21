import React from "react";
import CategoryCard from "./CategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function CategoryListCard() {
  const SampleNextArrow = ({ onClick }) => (
    <div style={{ position: "absolute", top: "50%", right: "0px", cursor: "pointer", zIndex: 1, transform: "translate(0%, -50%)" }} onClick={onClick}>
      <FaChevronRight style={{ fontSize: "24px", color: "lightgray" }} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <div style={{ position: "absolute", top: "50%", left: "8px", cursor: "pointer", zIndex: 1, transform: "translate(0%, -50%)" }} onClick={onClick}>
      <FaChevronLeft style={{ fontSize: "24px", color: "lightgray" }} />
    </div>
  );
  const settings = {
    dots: false,
    // arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="">
      <h2>Featured Categories</h2>
      <Slider {...settings}>
        {[...Array(10)].map((x, i) => (
          <div className="">
            <CategoryCard />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategoryListCard;
