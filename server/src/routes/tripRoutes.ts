import { Router } from "express";
import Trip from "../models/Trip";

const router = Router();

// Test route
router.get("/test", async (_req, res) => {
  res.json({ message: "Trips route is working!" });
});

// Later: Here we will add POST, GET, DELETE trips routes

export default router;
