import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );
            console.log(response.data);
            
        } catch (error) {
            console.log(error.response?.data);
        }
    };



  return (
    <div className="bg-gray-400 min-h-screen flex flex-col gap-8 items-center justify-center">
    <div className="text-3xl font-bold">
      <h1 className="text-center">SignUp Page</h1>  
    </div>
      

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 p-24 bg-white rounded-xl max-w-2/3 mx-auto shadow-md"
      >

        <div className="flex items-center justify-center">
            <label className="text-xl">
                Name:
            </label>

            <input 
                type="text"
                className="border ml-5 w-full p-2 rounded-xl"
                placeholder="Enter Your Name..."
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
        </div>
       

        <div className="flex items-center justify-center">
            <label className="text-xl">
                Email:
            </label>

            <input 
                type="email"
                className="border ml-7 w-full p-2 rounded-xl"
                placeholder="Enter Your Email..."
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
        </div>

        <div className="flex items-center justify-center">
            <label className="text-xl">
                Password:
            </label>

            <input 
                type="password"
                className="border w-full p-2 ml-2 rounded-xl"
                placeholder="Enter Password..."
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

            />
        </div>

        <button 
            type="submit"
            className="text-xl font-bold bg-green-500 hover:bg-green-600 text-white px-3 py-2 hover:cursor-pointer rounded-xl shadow-md"
        >
            Signup
        </button>

        <span className="text-center">
            <p>Already have an account?</p>
            <Link to="/login">
                <p className="underline">Login Here</p>
            </Link>
        </span>

      </form>

    </div>
  );
};

export default Signup;
