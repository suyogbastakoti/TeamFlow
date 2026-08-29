import express from "express";

import {registerUser, loginUser } from "../controllers/authController.js";

//routes = defines the URL + HTTP method
//app = main application
//router = smaller group of related routes

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;