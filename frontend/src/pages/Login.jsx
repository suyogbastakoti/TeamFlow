
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
      

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="text-center w-1/2">
        <h1 className="text-4xl mb-8 font-bold">
          Welcome to TeamFlow's
        </h1>

        <p className="text-xl font-bold">
          Login Page
        </p>
      </div>

      <div className="w-1/3">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center p-12 gap-8 bg-white rounded-xl shadow-md"
        >
          <div className="flex items-center justify-center">
            <label className="text-xl">
              Email:
            </label>

            <input
              type="email"
              placeholder="Enter your email..."
              className="border w-full rounded p-2 ml-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center">
            <label className="text-xl">
              Password:
            </label>

            <input
              type="password"
              placeholder="Enter your password..."
              className="border w-full rounded p-2 ml-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 hover:cursor-pointer px-3 py-2 rounded-xl shadow-md"
          >
            Login
          </button>

          <span className="text-center">
            <p>New to the platform?</p>

            <Link to="/signup">
              <p className="underline hover:cursor-pointer">
                Signup Here
              </p>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

