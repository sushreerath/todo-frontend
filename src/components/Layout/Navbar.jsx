import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout w/toast
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logout successfully");
    navigate("/login");
  };

  useEffect(() => {
    const userString = localStorage.getItem("todoapp");
    const userData = userString ? JSON.parse(userString) : null;
    setUsername(userData?.user?.username || "");
  }, []);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center">
              <i className="fa-solid fa-user-tie mr-2"></i>
              <span className="italic">Welcome</span>
              <span className="ml-1 font-bold text-blue-600">{username}!</span>
            </h4>
          </div>
          {/* Main Nav Desktop */}
          <ul className="hidden md:flex ml-10 space-x-4 items-center">
            <li>
              <Link
                to="/home"
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/todoList"
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                My todo List
              </Link>
            </li>
            <li>
              <button
                className="text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
                onClick={logoutHandler}
                title="logout"
              >
                <i className="fa-solid fa-power-off text-red-500 fa-lg" />
              </button>
            </li>
          </ul>
          {/* Hamburger (Mobile menu open button) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
            <li>
              <Link
                to="/home"
                className="block text-gray-700 hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-xl font-semibold w-full text-left transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/todoList"
                className="block text-gray-700 hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-xl font-semibold w-full text-left transition"
                onClick={() => setIsMenuOpen(false)}
              >
                My todo List
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logoutHandler();
                  setIsMenuOpen(false);
                }}
                title="logout"
                className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md text-xl font-semibold w-full text-left flex items-center transition"
              >
                <i className="fa-solid fa-power-off text-red-500 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
