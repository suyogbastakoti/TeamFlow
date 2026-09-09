import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);

      alert("Account created successfully. Please login!");

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl shadow-lg shadow-green-200 mb-5">
            <span className="text-white text-2xl font-bold">
              T
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Join TeamFlow
          </h1>

          <p className="text-slate-500 mt-2">
            Create your account and start managing your projects.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <p className="text-xs text-slate-400 mt-2">
                Choose a strong password to keep your account secure.
              </p>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-green-200 transition duration-200 hover:-translate-y-0.5"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px bg-slate-200 flex-1"></div>

            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Already a member?
            </span>

            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition"
            >
              Login to TeamFlow
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By creating an account, you agree to use TeamFlow responsibly.
        </p>

      </div>

    </div>
  );
};

export default Signup;
