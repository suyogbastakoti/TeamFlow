import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        description:{
            type: String,
        },

        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //it tells this id belongs to docs from the User model
            required: true,
        },
    }, 
    {timestamps: true}
);

const Project = mongoose.model("Project", projectSchema);

export default Project;

