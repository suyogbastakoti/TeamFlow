import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Get all projects from the logged-in user
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

  // Create project for the logged-in user
  const handleCreateProject = async (e) => {
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

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          TeamFlow Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your projects and tasks in one place.
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Create Project */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create Project
          </h2>

          <form
            onSubmit={handleCreateProject}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Project name"
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Project description"
              rows="4"
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              className="bg-green-500 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition"
              type="submit"
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
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <p className="text-gray-500">
                You don't have any projects yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project) => (
                <Link
                  to={`/projects/${project._id}`}
                  key={project._id}
                >
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer h-full">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {project.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {project.description}
                    </p>

                    <p className="text-green-500 text-sm font-medium mt-5">
                      View Project →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;