import mongoose from "mongoose";


//models/User.js = defines database structure
//models = "How do we interact with MongoDB?"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        password:{
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "member"],
            default: "member",
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;