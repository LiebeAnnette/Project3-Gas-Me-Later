type ResolverContext = any; // Replace with proper context type later
// server/src/graphql/resolvers.ts
import Trip from "../models/Trip.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
dotenv.config();

interface JwtPayload {
  data?: {
    id: string;
  };
}

function extractUserIdFromContext(context: any): string {
  const token = context.req?.headers?.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  console.log("🔐 Decoded token:", decoded);

  if (!decoded || !decoded.data?.id) {
    throw new Error("Invalid token payload");
  }

  return decoded.data.id;
}

const resolvers = {
  Query: {
    getTrips: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const userId = extractUserIdFromContext(context);
        const trips = await Trip.find({ userId });
        return trips;
      } catch (err) {
        console.error("Error fetching trips:", err);
        throw new Error("Failed to get trips");
      }
    },
    getTotalMiles: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const userId = extractUserIdFromContext(context);
        const trips = await Trip.find({ userId });
        const totalMiles = trips.reduce((sum, trip) => sum + trip.miles, 0);
        return totalMiles;
      } catch (err) {
        console.error("Error calculating total miles:", err);
        throw new Error("Failed to get total miles");
      }
    },
    generateReport: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const userId = extractUserIdFromContext(context);
        const trips = await Trip.find({ userId });
        const totalMiles = trips.reduce((sum, trip) => sum + trip.miles, 0);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        page.drawText("Gas Me Later Report", {
          x: 50,
          y: height - 50,
          size: 20,
          font,
          color: rgb(0, 0, 0),
        });

        let y = height - 80;
        trips.forEach((trip, index) => {
          const text = `${index + 1}. ${trip.startLocation} to ${
            trip.endLocation
          }, ${trip.miles} miles`;
          page.drawText(text, {
            x: 50,
            y: y,
            size: 12,
            font,
            color: rgb(0, 0, 0),
          });
          y -= 20;
        });

        page.drawText(`Total Miles: ${totalMiles}`, {
          x: 50,
          y: y - 20,
          size: 14,
          font,
          color: rgb(0, 0, 1),
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes).toString("base64");
      } catch (err) {
        console.error("Error generating PDF report:", err);
        throw new Error("Failed to generate report");
      }
    },
  },
  Mutation: {
    addTrip: async (_parent: unknown, args: any, context: any) => {
      try {
        const userId = extractUserIdFromContext(context);
        const newTrip = await Trip.create({ ...args, userId });
        return newTrip;
      } catch (err: any) {
        console.error("🚨 Error adding trip:", err?.message || err);
        console.error("📚 Stack trace:", err?.stack);
        throw new Error("Failed to add trip");
      }
    },
    deleteTrip: async (
      _parent: unknown,
      { id }: { id: string },
      context: any
    ) => {
      try {
        const userId = extractUserIdFromContext(context);
        const trip = await Trip.findOne({ _id: id, userId });
        if (!trip) throw new Error("Trip not found or not authorized");
        await Trip.findByIdAndDelete(id);
        return true;
      } catch (err) {
        console.error("Error deleting trip:", err);
        throw new Error("Failed to delete trip");
      }
    },
  },
};

export default resolvers;
