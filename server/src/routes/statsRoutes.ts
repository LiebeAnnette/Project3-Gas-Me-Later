import { Router, Request, Response } from "express";
import Trip from "../models/Trip";
import authenticateToken, {
  AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = Router();

// Get total mileage for logged-in user
router.get(
  "/mileage",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      const trips = await Trip.find({ userId });
      const totalMiles = trips.reduce((sum, trip) => sum + trip.miles, 0);

      res.json({ totalMiles });
    } catch (err) {
      console.error("Error calculating mileage:", err);
      res.status(500).json({ error: "Failed to fetch mileage stats" });
    }
  }
);

export default router;
