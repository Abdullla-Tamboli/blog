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
  // Apply pill-shaped and blur styles to navbar
  // You can use Tailwind's rounded-full and backdrop-blur classes
  // Optionally, add a semi-transparent background for glassmorphism effect
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="sticky fixed p-4">
      <div className="container  flex  items-center">
        <h1 className="text-xl font-bold text-blue-600">
          <Link to="/">Blogger</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-12 bg-white/70 border border-gray-200 shadow-lg rounded-full backdrop-blur-lg px-10 py-3 transition-all duration-300 fixed top-6 left-1/2 -translate-x-1/2 z-50"
            style={{ maxWidth: "900px" }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold"
                  : "text-gray-700 hover:text-blue-700 transition"
              }
            >
              Home
            </NavLink>

            {user ? (
              <>
                <span className="text-sm text-green-700 font-medium">
                  Welcome, {user.username}
                </span>
                <NavLink to="/dashboard" className="text-gray-700 hover:text-blue-700 transition">
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-white text-red-600 border border-red-400 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-red-600 hover:text-white shadow hover:shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-700 hover:text-blue-700 transition">
                  Login
                </NavLink>
                <NavLink to="/register" className="text-gray-700 hover:text-blue-700 transition">
                  Register
                </NavLink>
              </>
            )}
          </div>
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
