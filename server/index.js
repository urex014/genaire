 // index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import productRoute from './routes/productRoute.js'
import authRoute from './routes/authRoute.js'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
})); // Allow cross-origin requests
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev")); // Log requests in dev mode




// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "bobyx", // Database name (optional if in URI)
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on failure
  }
};
connectDB();

// Basic Route
app.use('/api/auth', authRoute)
app.use('/api/products',productRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start Server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on https://cloth-api-n2a3.onrender.com`);
});
