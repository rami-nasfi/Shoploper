import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  } else {
    if (!localStorage.getItem("storeID")) {
      return <Navigate to="/add-store" replace />;
    }
  }
  return <Outlet />;
}

export default ProtectedRoutes;
