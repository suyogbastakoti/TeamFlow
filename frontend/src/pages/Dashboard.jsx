import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { token } = useAuth();

  const [projects, setProjects] = useState([]);

  // Create project state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Edit project state
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  // Get all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
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

    if (token) {
      fetchProjects();
    }
  }, [token]);

  // Create project
  const handleCreateProjects = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
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

  // Update project
  const handleUpdateProject = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          name: editingName,
          description: editingDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? response.data : project
        )
      );

      setEditingId(null);
      setEditingName("");
      setEditingDescription("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Workspace
                </p>

                <h1 className="text-4xl font-bold mt-2">
                  Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                  Manage your projects and keep your work organized.
                </p>
              </div>

              <div className="bg-slate-100 px-5 py-3 rounded-xl">
                <p className="text-sm text-slate-500">
                  Total Projects
                </p>

                <p className="text-2xl font-bold mt-1">
                  {projects.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-7xl mx-auto px-6 py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Project */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm font-medium text-green-600">
                    New workspace item
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Create Project
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Start a new project and organize its tasks.
                  </p>
                </div>

                <form
                  onSubmit={handleCreateProjects}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project name
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Website Redesign"
                      className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      placeholder="What is this project about?"
                      className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold rounded-xl p-3 hover:bg-green-600 transition"
                  >
                    + Create Project
                  </button>
                </form>
              </div>
            </div>

            {/* Project section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Your Projects
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Select a project to manage its tasks.
                  </p>
                </div>
              </div>

              {projects.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                  <div className="text-4xl mb-4">
                    📁
                  </div>

                  <h3 className="text-xl font-semibold">
                    No projects yet
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Create your first project using the form.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >
                      {editingId === project._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Project name
                            </label>

                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) =>
                                setEditingName(e.target.value)
                              }
                              className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Description
                            </label>

                            <textarea
                              rows="4"
                              value={editingDescription}
                              onChange={(e) =>
                                setEditingDescription(e.target.value)
                              }
                              className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateProject(project._id)
                              }
                              className="flex-1 bg-green-500 text-white rounded-xl p-3 font-medium hover:bg-green-600"
                            >
                              Save Changes
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(null);
                                setEditingName("");
                                setEditingDescription("");
                              }}
                              className="px-5 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold">
                                {project.name}
                              </h3>

                              <p className="text-slate-500 mt-2 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
                              {project.name?.charAt(0)?.toUpperCase()}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                            <Link
                              to={`/projects/${project._id}`}
                              className="flex-1"
                            >
                              <button
                                type="button"
                                className="w-full bg-slate-900 text-white rounded-xl p-2.5 font-medium hover:bg-slate-800"
                              >
                                Open Project
                              </button>
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(project._id);
                                setEditingName(project.name);
                                setEditingDescription(
                                  project.description
                                );
                              }}
                              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProject(project._id)
                              }
                              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
