import React from "react";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProductManagement from "./components/ProductManagement";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import OrderPage from "./components/OrderPage";
import CartPage from "./components/CartPage";
import ProductDisplayPage from "./components/ProductDisplayPage";

const ProtectedRoute = ({ element }) => {
  const user = localStorage.getItem("token"); // Check if user is logged in
  return user ? element : <Navigate to="/login" replace />;
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, // Login page without Layout
  },
  {
    path: "/register",
    element: <RegisterPage />, // Register page without Layout
  },
  {
    path: "/",
    element: <Layout />, // Layout contains Navbar and common UI
    children: [
      {
        index: true, // Default child route
        element: <Navigate to="/login" replace />, // Redirect to login if no specific route is provided
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<AdminPage />} />,
      },
      {
        path: "/products",
        element: <ProtectedRoute element={<ProductManagement />} />,
      },
      {
        path: "/order",
        element: <ProtectedRoute element={<OrderPage />} />,
      },
      {
        path: "/cart",
        element: <ProtectedRoute element={<CartPage />} />,
      },
      {
        path: "/page-products",
        element: (
          <ProtectedRoute
            element={
              <ProductDisplayPage
                userId={localStorage.getItem("userId")} // Pass userId from localStorage
              />
            }
          />
        ),
      },
      {
        path: "*",
        element: <div>404 Not Found</div>, // Catch-all for undefined routes
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
