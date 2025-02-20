// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
