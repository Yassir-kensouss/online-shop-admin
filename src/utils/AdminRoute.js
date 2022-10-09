import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./helpers";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
