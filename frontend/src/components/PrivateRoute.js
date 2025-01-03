import React from "react";
import { Route, Navigate } from "react-router-dom";

// PrivateRoute Component to protect private routes
const PrivateRoute = ({ element, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get the user from localStorage

  return (
    <Route
      {...rest}
      element={
        user ? (
          element // If user exists, show the element (component)
        ) : (
          <Navigate to="/login" /> // If no user, redirect to login page
        )
      }
    />
  );
};

export default PrivateRoute;
