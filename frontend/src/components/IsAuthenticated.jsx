import React from "react";
import { Navigate } from "react-router-dom";

const IsAuthenticated = () => {
  const userName = localStorage.getItem("userName");
  const userType = localStorage.getItem("UserType");

  return userName == null ? (
    <Navigate to="/landing" replace />
  ) : userType == "Admin" ? (
    <Navigate to="/foodfly/user-type/admin" replace />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default IsAuthenticated;
