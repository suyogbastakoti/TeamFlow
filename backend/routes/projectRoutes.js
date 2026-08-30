import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.patch("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);


export default router;

