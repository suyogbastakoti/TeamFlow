import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//controller = contains the actual registration logic
//controller = "What should happen when that request arrives?"

const registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        
        //basic validation
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        //password validation
        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be at least 6 characters",
            });
        }

        //validating existinguser

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully!",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },

        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;

        console.log(email, password);

        const user = await User.findOne({email});
        console.log("User found:", user);

        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

export {registerUser, loginUser};
