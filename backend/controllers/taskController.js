import Task from "../models/Task.js";
import Project from "../models/Projects.js";


//get tasks
const getTasks = async(req, res)=>{
    try {
        const tasks = await Task.find({
            project: req.params.projectId,
        });

        res.status(200).json(tasks);

    } catch (error) {
        res.status.json({
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
}


//create task
const createTask = async(req, res)=>{
    try {
        const {title, description, project} = req.body;

        const existingProject = await Project.findOne({
            _id: project,
            owner: req.user.userId,
        });

        if(!existingProject){
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const task = await Task.create({
            title,
            description,
            project,
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            message:"Failed to create task",
            error: error.message,
        })
    }
};

//update task
const updateTask= async(req, res)=>{
    try {
        const {title, description, status} = req.body;

        const task = await Task.findByIdAndUpdate(req.params.id, 
            {
                title,
                description,
                status,
            },
            {new: true}
        );

        if(!task){
            return res.status(404).json({
                message: "Task not found!",
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
};

//delete task
const deleteTask = async(req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).json({
                message: "Task not found!",
            });
        }

        res.status(200).json({
            message: "Task deleted successfully!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message,
        })
    }
}

export { getTasks,createTask, updateTask, deleteTask };