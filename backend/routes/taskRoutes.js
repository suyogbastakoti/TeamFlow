import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);


export default router;