import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-lime-300 p-3">
        {/* Logo */}

        <h1 

            className="text-3xl font-bold p-3"
        >
            TeamFlow
        </h1>

        {/* nav links */}
        <div className="flex gap-4 font-semibold text-xl">

            <a 
                className="hover:underline hover:text-white"
                href="#home"
            >
                Home
            </a>

            <a 
                className="hover:underline hover:text-white"
                href="#features"
            >
                Features
            </a>

        </div>

        {/* buttons to redirect to login and signup */}

        <div className="flex gap-4 p-3 text-xl">
            <Link to="/login">
                <button
                    className="px-3 py-3 rounded-xl shadow-sm bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white"
                >
                    Login
                </button>
            </Link>

            <Link to="/signup">
                <button
                    className="px-3 py-3 rounded-xl shadow-sm bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white"
                >
                    SignUp
                </button>
            </Link>
        </div>
        
    </nav>
  );
};

export default Navbar;
