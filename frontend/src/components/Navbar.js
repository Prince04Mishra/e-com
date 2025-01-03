import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const isAdmin = true; // Replace with actual logic to check admin status
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="ml-5">
          <Link to="/page-products">
            <p className="text-3xl text-green-500 font-bold font-serif">eCom</p>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 mr-5">
          {isAuthenticated && (
            <>
              {isAdmin && (
                <>
                  <li>
                    <Link to="/admin" className="hover:text-green-400">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="hover:text-green-400">
                      Product Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="hover:text-green-400">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/order" className="hover:text-green-400">
                      Order
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-500"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/login" className="hover:text-green-400">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Toggle Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Navigation"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        id="mobile-menu"
        className="hidden flex flex-col mt-4 space-y-2 md:hidden"
      >
        {isAuthenticated && (
          <>
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin" className="block hover:text-green-400">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="block hover:text-green-400">
                    Product Management
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="block hover:text-green-400">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/order" className="block hover:text-green-400">
                    Order
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="block hover:text-red-500"
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login" className="block hover:text-green-400">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
