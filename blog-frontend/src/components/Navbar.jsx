import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get token and user safely
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = token ? JSON.parse(localStorage.getItem("user")) : null;
  } catch (err) {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          <Link to="/">Blogger</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-700 font-semibold" : "text-gray-700"
            }
          >
            Home
          </NavLink>

          {user ? (
            <>
              <span className="text-sm text-green-700 font-medium">
                Welcome, {user.username}
              </span>
              <NavLink to="/dashboard" className="text-gray-700">
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-gray-700">
                Login
              </NavLink>
              <NavLink to="/register" className="text-gray-700">
                Register
              </NavLink>
            </>
          )}
          <NavLink to="/create-post" className="text-blue-500 hover:underline">
            + New Post
            </NavLink>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <NavLink to="/" className="block text-gray-700">
            Home
          </NavLink>

          {user ? (
            <>
              <span className="block text-sm text-green-700 font-medium">
                Welcome, {user.username}
              </span>
              <NavLink to="/dashboard" className="block text-gray-700">
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="block text-gray-700">
                Login
              </NavLink>
              <NavLink to="/register" className="block text-gray-700">
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
