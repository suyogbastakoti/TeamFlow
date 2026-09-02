import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProjectDetails = ()=>{
    
    const {id} = useParams();

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingStatus, setEditingStatus] = useState("todo");


    //fetch tasks inside the projects
    useEffect(()=>{
        const fetchTasks = async()=>{
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`http://localhost:5000/api/tasks/${id}`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Tasks:", response.data);
                setTasks(response.data);

            } catch (error) {
                console.log(error.response?.data);
            }
        }

        fetchTasks();

    }, [id]);

    //create tasks
    const handleCreateTask = async(e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post("http://localhost:5000/api/tasks/",
                {
                    title,
                    description,
                    project:id,

                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prevTasks)=>[
                ...prevTasks, response.data
            ]);

            setTitle("");
            setDescription("");

        } catch (error) {
            console.log(error.response?.data);
        }
    }

    //update Tasks
    const handleUpdateTasks = async(id)=>{
        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(`http://localhost:5000/api/tasks/${id}`,
                {
                    title: editingTitle,
                    description: editingDescription,
                    status: editingStatus,
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prevTasks)=>
                prevTasks.map((task)=>
                    task._id === id ? response.data : task 
            ));

            setEditingTaskId(null);
            setEditingTitle("");
            setEditingDescription("");
            setEditingStatus("todo");

        } catch (error) {
            console.log(error.response?.data);
        }
    }

    const handleDeleteTasks = async(id)=>{
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:5000/api/tasks/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prevTasks)=>
                prevTasks.filter((task)=>task._id !== id));

        } catch (error) {
            console.log(error.response?.data);
        }
    };


    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">
                Project Details
            </h1>

            <p className="mt-2 text-gray-500">
                Project ID: {id}
            </p>

            <Link 
            to="/dashboard"
            >
                <h1 className="font-bold text-4xl mt-5 w-fit">
                    🔙
                </h1>
            </Link>
            

            <div className="grid grid-cols-1 lg:grid-cols-2">

                <form 
                onSubmit={handleCreateTask}                
                className="bg-white p-6 rounded-2xl shadow-sm max-w-xl mt-8 h-fit"
            >
                <h2 className="text-2xl font-semibold mb-5">
                    Create Task
                </h2>

                <div className="flex flex-col gap-4">
                    <input 
                        type="text"
                        placeholder="Task Title"
                        className="border border-gray-300 rounded-xl p-3" 
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Task description"
                        rows="4"
                        className="border border-gray-300 rounded-xl p-3 resize-none"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600"
                    >
                        Create Task
                    </button>

                </div>

            </form>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                    Tasks
                </h2>

                {tasks.length === 0 ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <p className="text-gray-500">No tasks have been created for this project yet.</p>
                    </div>

                ): (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {tasks.map((task)=>(
                    <div
                        key={task._id}
                        className="bg-white p-5 rounded-xl shadow-sm mb-4"
                    >
                        {editingTaskId === task._id ? (
                            <div className="flex flex-col gap-4">
                                <input 
                                    type="text"
                                    placeholder="Task Title"
                                    className="border border-gray-300 rounded-xl p-3" 
                                    value={editingTitle}
                                    onChange={(e)=>setEditingTitle(e.target.value)}
                                />

                                <textarea
                                    placeholder="Task description"
                                    rows="4"
                                    className="border border-gray-300 rounded-xl p-3 resize-none"
                                    value={editingDescription}
                                    onChange={(e)=>setEditingDescription(e.target.value)}
                                />

                                <select
                                    value={editingStatus}
                                    onChange={(e)=>setEditingStatus(e.target.value)}
                                    className="border border-gray-300 rounded-xl p-2 mt-3"
                                >
                                    <option value="todo">Todo</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>

                                <div className="flex items-center gap-4 mt-5">
                                    <button
                                        type="button"
                                        onClick={()=>handleUpdateTasks(task._id)}
                                        className="text-green-500 hover:text-green-700 font-semibold"
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                        setEditingTaskId(null);
                                        setEditingTitle("");
                                        setEditingDescription("");
                                        setEditingStatus("todo");
                                        }}
                                        className="text-gray-500 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ):(
                            <>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {task.title}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {task.description}
                                </p>

                                <p className="mt-2 text-sm font-medium">
                                    Status: {task.status}
                                </p>

                                

                                <div className="flex gap-4">

                                    <button
                                        onClick={()=>{
                                            setEditingTaskId(task._id);
                                            setEditingTitle(task.title);
                                            setEditingDescription(task.description);
                                            setEditingStatus(task.status);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 font-semibold mt-5"
                                    >
                                        Edit
                                    </button>

                                    <button
                                            onClick={()=>handleDeleteTasks(task._id)}
                                            className="text-red-500 hover:text-red-700 font-semibold mt-5"
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

        </div>
    );
};

export default ProjectDetails;