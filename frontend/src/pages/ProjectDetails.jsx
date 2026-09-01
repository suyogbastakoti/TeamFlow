import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetails = ()=>{
    
    const {id} = useParams();

    const [tasks, setTasks] = useState([]);

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


    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">
                Project Details
            </h1>

            <p className="mt-2 text-gray-500">
                Project ID: {id}
            </p>

            <div className="mt-8">
                {tasks.map((task)=>(
                    <div
                        key={task._id}
                        className="bg-white p-5 rounded-xl shadow-sm mb-4"
                    >
                        <h2 className="text-xl font-semibold">
                            {task.title}
                        </h2>

                        <p className="text-gray-500">
                            {task.description}
                        </p>

                        <p className="mt-2 text-sm">
                            Status: {task.status}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProjectDetails;