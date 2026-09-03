import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 oy-24 text-center mt-11">
            <h1 className="text-5xl font-bold text-gray-800">
                Manage Projects
                <span className="ml-4 text-green-500">
                    Get Things Done!
                </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-500">
                TeamFlow helps you organize projects, manage tasks, and 
                keep your work moving forward in one simple workspace.
            </p>

            <div className="flex justify-center gap-4 mt-8">
                <Link
                to="/signup"
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600"
                >
                 Get Started   
                </Link>

                <Link
                to="/login"
                className="border border-gray-300 bg-green-500 px-6 py-3 rounded-xl font-medium text-white hover:text-gray-700 hover:bg-lime-300"
                >
                 Login
                </Link>


            </div>


        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-16">

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">
                    Everything You Need
                </h2>

                <p className="text-gray-500 mt-3">
                    Keep your projects organized without unneccessary complexity. 
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Project Management
                    </h3>

                    <p className="text-gray-500 mt-3">
                        Create, update, and organize all your projects in one place.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                    <h3 className="text-xl font-semibold text-gray-800"> 
                        Task Management 
                    </h3> 
                    
                    <p className="text-gray-500 mt-3"> 
                        Create tasks, update their status, and keep track of your work. 
                    </p> 
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                    
                    <h3 className="text-xl font-semibold text-gray-800">
                        Simpel & Secure
                    </h3>
                    
                    <p className="text-gray-500 mt-3">
                        Authentication and protected resources keep your workspace safe.
                    </p>
                
                </div>

            </div>

        </section>


        {/* How It Works */}
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        How TeamFlow Works?
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    
                    <div>
                        <div className="text-4xl font-bold text-green-500">
                            01
                        </div>

                        <h3 className="text-xl font-semibold mt-3">
                            Create a project
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Start by creating a project for the work you want to manage.
                        </p>
                    </div>


                    <div> 
                        <div className="text-4xl font-bold text-green-500"> 
                            02 
                        </div> 
                        
                        <h3 className="text-xl font-semibold mt-3">
                            Add Tasks 
                        </h3> 
                        
                        <p className="text-gray-500 mt-2"> 
                            Break your project into manageable tasks. 
                        </p> 
                    </div> 
                    
                    <div> 
                        <div className="text-4xl font-bold text-green-500"> 
                            03 
                        </div> 
                        
                        <h3 className="text-xl font-semibold mt-3"> 
                            Track Progress 
                        </h3> 
                        
                        <p className="text-gray-500 mt-2"> 
                            Update task statuses and keep your work moving. 
                        </p>     
                    </div>

                </div>

            </div>

        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-10 text-center">
           <h2 className="text-3xl font-bold text-gray-800">
            Ready to organize your work?
           </h2>

           <p className="text-gray-500 mt-3"> 
                Create your TeamFlow account and start managing your projects. 
            </p> 
            
            <Link 
                to="/signup" 
                className="inline-block mt-7 bg-green-500 text-white px-7 py-3 rounded-xl font-medium hover:bg-green-600"
            > 
                Get Started 
            </Link>

        </section>



        <Footer/>
    </div>
  );
};

export default Home;
