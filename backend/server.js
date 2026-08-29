import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";


import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";

dotenv.config();

//start express server
const app = express();

//Its a middleware which tell express: When a request contains JSON data,
//parse it so I can access it through req.body.
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

//test route
app.get("/", (req, res)=>{
    res.json({message: "TeamFlow API is running"});
});

app.get("/api/protected", protect, (req, res)=>{
    res.json({
        message: "You accessed a protected route"
    });
});

//get route
app.get("/api/projects", (req, res)=>{
    res.json({
        message: "Get all projects"
    });
});

//post route
app.post("/api/projects", (req, res)=>{
    res.json({message: "Create a project"});
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