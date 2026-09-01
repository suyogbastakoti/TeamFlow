
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);


  // Get all projects for logged-in user
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchProjects();
  }, []);

  // Create project for logged-in user
  const handleCreateProjects = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/projects",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) => [
        ...prevProjects,
        response.data,
      ]);

      setName("");
      setDescription("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };


  //edit or update the project
  const handleUpdateProject = async(id)=>{
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(`http://localhost:5000/api/projects/${id}`,
      {
        name, 
        description,
      },
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setProjects((prevProjects)=>prevProjects.map((project)=>project._id === id ? response.data : project))
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  //deleting project for logged in user
  const handleDeleteProject = async(id)=>{
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/projects/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects)=>
        prevProjects.filter((project)=>project._id !== id));

    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          TeamFlow Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your projects in one place.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Create Project */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Project
          </h2>

          <form
            onSubmit={handleCreateProjects}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Project name"
              className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Project description"
              rows="4"
              className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type="submit"
              className="bg-green-500 text-white font-medium rounded-xl p-3 hover:bg-green-600 transition"
            >
              Create Project
            </button>
          </form>
        </div>

        {/* Projects */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Projects
          </h2>

          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <p className="text-gray-500">
                You don't have any projects yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {project.description}
                  </p>

                  
                  <div className="flex gap-4 mt-5">
                    {editingId === project._id ? (
                      <button
                        type="button"
                        onClick={()=>handleUpdateProject(project._id)}
                        className="text-green-600 font-medium"
                      >
                        Save
                      </button>
                    ):(
                      <button
                        type="button"
                        onClick={()=>{
                          setEditingId(project._id);
                          setName(project.name),
                          setDescription(project.description);
                        }}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={()=>handleDeleteProject(project._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-xl font-medium"
                    >
                      Delete
                    </button>
                  </div>

                  

                  <Link to={`/projects/${project._id}`}>
                    <button
                      type="button"
                      className="mt-5 text-green-600 font-medium hover:text-green-700"
                    >
                      View Project →
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
