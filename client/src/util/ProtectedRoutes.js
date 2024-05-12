import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  if (!localStorage.getItem("token")) {
    if (!localStorage.getItem("store")) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
