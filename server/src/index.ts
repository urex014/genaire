import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
// import adminRoutes from "./routes/adminRoutes";
// import publicRoutes from "./routes/publicRoutes";


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Genaire backend is running...");
});

// Use routes
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
