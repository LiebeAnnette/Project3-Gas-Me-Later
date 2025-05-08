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

// DELETE /api/trips/:id
router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const trip = await Trip.findOneAndDelete({ _id: id, userId });

    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return; // ✅ Clean exit
    }

    res.json({ message: "Trip deleted" }); // ✅ Just respond, don't return
  }
);

export default router;
