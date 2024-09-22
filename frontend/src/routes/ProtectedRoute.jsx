import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const { token, logout } = useAuth();
  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (Date.now() >= jwtDecode(token)?.exp *1000) {
    
    return <Navigate to="/login" />;
  }
  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
