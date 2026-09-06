import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
            <Link
                to="/"
                className="text-2xl font-bold text-green-600"
                >
                TeamFlow
            </Link>

        </div>
        
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-green-600"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-green-600"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={logout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
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