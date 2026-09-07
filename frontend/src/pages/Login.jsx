import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to TeamFlow
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue to your workspace
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email..."
                className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="bg-green-500 text-white font-medium p-3 rounded-xl hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-500">
              New to TeamFlow?
            </p>

            <Link
              to="/signup"
              className="text-green-600 font-medium hover:text-green-700"
            >
              Create an account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
