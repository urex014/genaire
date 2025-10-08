import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

// Register a new user
export async function register(req, res) {
  try{
    const { fullName, email, password, phone } = req.body;

    if(!fullName||!email||!password||!phone){
      return res.status(400).json({message:"All fields are required"})
    }
    const existingUser = await Auth.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"User already exists"})
    }
    const existingPhone = await Auth.findOne({phone})
    if(existingPhone){
      return res.status(400).json({message:"Phone number already in use"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({message:"User registered successfully"})
  }catch(err){
    res.status(500).json({message:"Server error"})
  }
}

//login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    })
  } catch (error) {
    
  }
}