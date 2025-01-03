import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    loggedInCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats"
        );
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch statistics.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Customers
            </h2>
            <p className="text-4xl font-bold text-green-500 mt-4">
              {stats.userCount}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Currently Logged-In Users
            </h2>
            <p className="text-4xl font-bold text-green-500 mt-4">
              {stats.loggedInCount || 0}
            </p>
          </div>

          {/* Total Products */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Products
            </h2>
            <p className="text-4xl font-bold text-blue-500 mt-4">
              {stats.productCount}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Orders
            </h2>
            <p className="text-4xl font-bold text-purple-500 mt-4">
              {stats.orderCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
