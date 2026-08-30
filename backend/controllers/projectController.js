import Project from "../models/Projects.js";

//get projects
const getProjects = async(req, res)=>{
    try {
        const projects = await Project.find({
            owner: req.user.userId,
        });

        res.status(200).json(projects);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
};

//create project
const createProject = async(req, res)=>{
    try {
        const {name, description} = req.body;

        if(!name){
            return res.status(400).json({
                message: "Project name is required!"
            });
        }

        const project = await Project.create({
            name, 
            description,
            owner: req.user.userId,
        });

        res.status(201).json(project);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to create project",
            error: error.message,
        });
    }
};

//update project
const updateProject = async(req, res)=>{
    
    try {
        const { name, description } = req.body;

        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.userId,
            },

            {
                name,
                description,
            },

            {
                new: true
            }
    );

    //basic validation
    if (!name) {
    return res.status(400).json({
        message: "Project name is required",
    });
    }

    if(!project){
        return res.status(404).json({
            message: "Project not found",
        });
    }

    res.status(200).json(project);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to update project",
            error: error.message,
        });
    }
};

//delete project
const deleteProject = async(req, res)=>{
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.userId,
        });

        if(!project){
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully!"
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete project",
            error: error.message,
        });

    }
};

export { createProject, getProjects, updateProject, deleteProject };
