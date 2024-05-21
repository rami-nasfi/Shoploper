import React from "react";
import MainNavigation from "./themes/MainNavigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Store({ name }) {
  return (
    <Router>
      <Routes>
        <Route path={`/store/${name}/product`} element={<MainNavigation />} />
      </Routes>
    </Router>
  );
}

export default Store;
