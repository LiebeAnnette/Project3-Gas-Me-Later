import { Router, Request, Response } from "express";
import Trip from "../models/Trip";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/trips - get all trips for this user
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const trips = await Trip.find({ userId });
  res.json(trips);
});

// POST /api/trips - add a trip for this user
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { startLocation, endLocation, miles, date } = req.body;

  const newTrip = await Trip.create({
    startLocation,
    endLocation,
    miles,
    date,
    userId,
  });

  res.status(201).json(newTrip);
});

export default router;
