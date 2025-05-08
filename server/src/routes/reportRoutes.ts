import { Router, Response } from "express";
import Trip from "../models/Trip.js";
import authenticateToken, {
  AuthenticatedRequest,
} from "../middleware/authMiddleware.js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ITrip } from "../models/Trip.js";

const router = Router();

router.get(
  "/report",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const trips = await Trip.find({ userId });

      const totalMiles = trips.reduce((sum, trip) => sum + trip.miles, 0);

      // 🧾 Create PDF
      console.log("Generating PDF report for user:", req.user?.username);
      console.log("Total trips:", trips.length);
      console.log("First trip:", trips[0]);

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      let y = 750;

      const drawText = (text: string, size = 12) => {
        page.drawText(text, {
          x: 50,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });
        y -= size + 6;
      };

      drawText("Gas Me Later - Trip Report", 18);
      drawText(`Generated on: ${new Date().toLocaleDateString()}`);
      drawText(`User: ${req.user?.username}`);
      drawText(`Total Miles: ${totalMiles}`);
      y -= 20;

      trips.forEach((trip, index) => {
        const t = trip as ITrip;

        drawText(`${index + 1}. ${t.startLocation} -> ${t.endLocation}`);
        drawText(
          `   Miles: ${t.miles} | Date: ${new Date(
            t.date
          ).toLocaleDateString()}`
        );
        if (t.weather?.description) {
          drawText(`   Weather: ${t.weather.description}, ${t.weather.temp}°F`);
        }
        y -= 10;
      });

      const pdfBytes = await pdfDoc.save();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=trip-report.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (err) {
      console.error("Error generating report:", err);
      res.status(500).json({ error: "Failed to generate report" });
    }
  }
);

export default router;
