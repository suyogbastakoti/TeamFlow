import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const ProjectDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);

  // Create task state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit task state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingStatus, setEditingStatus] = useState("todo");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [id, token]);

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          project: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) => [
        ...prevTasks,
        response.data,
      ]);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Update task
  const handleUpdateTasks = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          title: editingTitle,
          description: editingDescription,
          status: editingStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? response.data : task
        )
      );

      setEditingTaskId(null);
      setEditingTitle("");
      setEditingDescription("");
      setEditingStatus("todo");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Delete task
  const handleDeleteTasks = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      <Navbar />

      <main className="flex-1">

        {/* Project Header */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-10">

            <Link
              to="/dashboard"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-green-600"
            >
              ← Back to Dashboard
            </Link>

            <div className="mt-6">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                Project Workspace
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                <div>
                  <h1 className="text-4xl font-bold mt-2">
                    Project Details
                  </h1>

                  <p className="text-slate-500 mt-2">
                    Manage tasks and track progress for this project.
                  </p>
                </div>

                <div className="bg-slate-100 px-4 py-2 rounded-xl text-sm">
                  <span className="text-slate-500">
                    Project ID:
                  </span>{" "}
                  <span className="font-mono text-slate-700">
                    {id.slice(-8)}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-6 py-10 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Create Task */}
            <div className="lg:col-span-1">

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-6">

                <p className="text-sm font-medium text-green-600">
                  New task
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Create Task
                </h2>

                <p className="text-sm text-slate-500 mt-2 mb-6">
                  Add a task to this project and start tracking it.
                </p>

                <form
                  onSubmit={handleCreateTask}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Task title
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Build login page"
                      className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      placeholder="Describe what needs to be done..."
                      className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white rounded-xl p-3 font-semibold hover:bg-green-600 transition"
                  >
                    + Create Task
                  </button>
                </form>

              </div>
            </div>

            {/* Tasks */}
            <div className="lg:col-span-2">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    Tasks
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in this project
                  </p>
                </div>

              </div>

              {tasks.length === 0 ? (

                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">

                  <div className="text-4xl mb-4">
                    ✅
                  </div>

                  <h3 className="text-xl font-semibold">
                    No tasks yet
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Create your first task using the form.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {tasks.map((task) => (

                    <div
                      key={task._id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                    >

                      {editingTaskId === task._id ? (

                        <div className="space-y-4">

                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) =>
                              setEditingTitle(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <textarea
                            rows="4"
                            value={editingDescription}
                            onChange={(e) =>
                              setEditingDescription(e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          />

                          <select
                            value={editingStatus}
                            onChange={(e) =>
                              setEditingStatus(e.target.value)
                            }
                            className="border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            <option value="todo">
                              Todo
                            </option>

                            <option value="in-progress">
                              In Progress
                            </option>

                            <option value="done">
                              Done
                            </option>
                          </select>

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateTasks(task._id)
                              }
                              className="bg-green-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600"
                            >
                              Save Changes
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingTaskId(null);
                                setEditingTitle("");
                                setEditingDescription("");
                                setEditingStatus("todo");
                              }}
                              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          </div>

                        </div>

                      ) : (

                        <>
                          <div className="flex items-start justify-between gap-5">

                            <div>
                              <h3 className="text-xl font-bold text-slate-800">
                                {task.title}
                              </h3>

                              <p className="text-slate-500 mt-2 leading-relaxed">
                                {task.description}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                                task.status === "done"
                                  ? "bg-green-100 text-green-700"
                                  : task.status === "in-progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {task.status === "in-progress"
                                ? "In Progress"
                                : task.status}
                            </span>

                          </div>

                          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">

                            <button
                              type="button"
                              onClick={() => {
                                setEditingTaskId(task._id);
                                setEditingTitle(task.title);
                                setEditingDescription(
                                  task.description
                                );
                                setEditingStatus(task.status);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteTasks(task._id)
                              }
                              className="px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 font-medium"
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

export default ProjectDetails;
