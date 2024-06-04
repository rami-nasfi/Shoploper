import React, { useContext, useEffect } from "react";
import MainNavigation from "./themes/MainNavigation";
import CarouselImage from "./themes/CarouselImage";
import CategoryListCard from "./themes/CategoryListCard";
import ProductListCard from "./themes/ProductListCard";
import Footer from "./themes/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { useStoreID } from "../App";
import axios from "axios";

function Themes() {
  const theme = useTheme();
  const { storeID } = useContext(useStoreID);

  useEffect(() => {
    const fetchTheme = async (req, res) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/theme/${storeID}`);
        if (res.data !== "") {
          theme.setTheme(res.data);
        } else {
          theme.setTheme({});
        }
      } catch (error) {}
    };
    fetchTheme();
  }, [storeID]);
  return (
    <div className="container ">
      <div className="d-flex flex-column gap-5">
        <MainNavigation />
        <CarouselImage />
        <CategoryListCard />
        <ProductListCard />
        <Footer />
      </div>
    </div>
  );
}

export default Themes;
