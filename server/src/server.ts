import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes";
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/trips", tripRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("Gas Me Later Backend is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gas-me-later")
  .then(() => {
    console.log("MongoDB connected!");
    app.use("/api/auth", authRoutes);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
