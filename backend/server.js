import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";


dotenv.config();
console.log("JWT SECRET:", process.env.JWT_SECRET);

//start express server
const app = express();

//allows fronted and backend to communicate running from different ports
app.use(cors());
//Its a middleware which tell express: When a request contains JSON data,
//parse it so I can access it through req.body.
app.use(express.json());

//auth routes
app.use("/api/auth", authRoutes);

//project routes
app.use("/api/projects", projectRoutes);

//task routes
app.use("/api/tasks", taskRoutes);

//test route
app.get("/", (req, res)=>{
    res.json({
        message: "TeamFlow API is running"
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT, () => {
            console.log("Server running on port:", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });