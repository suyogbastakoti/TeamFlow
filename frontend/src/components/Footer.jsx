import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              TeamFlow
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Simple and efficient project and task management
              designed to help teams stay organized and productive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition"
              >
                Dashboard
              </Link>

              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* About TeamFlow */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              TeamFlow
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Plan projects, manage tasks, and keep your entire
              team moving forward.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500">
            © 2026 TeamFlow. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with React & Node.js
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;