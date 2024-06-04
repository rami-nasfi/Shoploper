import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RedirectRoutes() {
  if (localStorage.getItem("role") === "staff") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default RedirectRoutes;
