import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
