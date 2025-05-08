import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Route mounting (only once)
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/stats", reportRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("Gas Me Later Backend is running!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gas-me-later")
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const clientBuildPath = path.join(__dirname, "..", "..", "client", "dist");

  app.use(express.static(clientBuildPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}
