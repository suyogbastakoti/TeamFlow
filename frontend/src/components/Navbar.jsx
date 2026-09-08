import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-green-500 border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">

        {/* Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-3xl font-bold text-white"
          >
            TeamFlow
          </Link>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-8">
          {token &&(
            <Link
            to="/"
            className="text-gray-600 hover:text-green-600"
          >
            Home
          </Link>
          )}

          {token && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-green-600"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center gap-6">
          {token ? (
            <button
              type="button"
              onClick={logout}
              className="text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-green-600 text-xl"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-600 text-xl"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;