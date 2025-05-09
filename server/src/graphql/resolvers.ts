type ResolverContext = any; // Replace with proper context type later
// server/src/graphql/resolvers.ts
import Trip from "../models/Trip.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  data: {
    id: string;
  };
}

const resolvers = {
  Query: {
    getTrips: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const token = context.req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        const userId = decoded.data.id;

        const trips = await Trip.find({ userId });
        return trips;
      } catch (err) {
        console.error("Error fetching trips:", err);
        throw new Error("Failed to get trips");
      }
    },
    getTotalMiles: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const token = context.req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        const userId = decoded.data.id;

        const trips = await Trip.find({ userId });
        const totalMiles = trips.reduce((sum, trip) => sum + trip.miles, 0);

        return totalMiles;
      } catch (err) {
        console.error("Error calculating total miles:", err);
        throw new Error("Failed to get total miles");
      }
    },
  },
  Mutation: {
    addTrip: async (_parent: unknown, args: any, context: any) => {
      try {
        const token = context.req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        const userId = decoded.data.id;

        const newTrip = await Trip.create({ ...args, userId });
        return newTrip;
      } catch (err) {
        console.error("Error adding trip:", err);
        throw new Error("Failed to add trip");
      }
    },
    deleteTrip: async (
      _parent: unknown,
      { id }: { id: string },
      context: any
    ) => {
      try {
        const token = context.req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        const userId = decoded.data.id;

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

// OLD CODE
// // server/src/graphql/resolvers.ts
// import Trip from "../models/Trip.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// interface JwtPayload {
//   data: {
//     id: string;
//   };
// }

// const resolvers = {
//   Query: {
//     getTrips: async (_parent: unknown, _args: unknown, context: any) => {
//       try {
//         const token = context.req.headers.authorization?.split(" ")[1];
//         if (!token) throw new Error("Unauthorized");

//         const decoded = jwt.verify(
//           token,
//           process.env.JWT_SECRET!
//         ) as JwtPayload;
//         const userId = decoded.data.id;

//         const trips = await Trip.find({ userId });
//         return trips;
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//         throw new Error("Failed to get trips");
//       }
//     },
//   },
//   Mutation: {
//     addTrip: async (_parent: unknown, args: any, context: any) => {
//       try {
//         const token = context.req.headers.authorization?.split(" ")[1];
//         if (!token) throw new Error("Unauthorized");

//         const decoded = jwt.verify(
//           token,
//           process.env.JWT_SECRET!
//         ) as JwtPayload;
//         const userId = decoded.data.id;

//         const newTrip = await Trip.create({ ...args, userId });
//         return newTrip;
//       } catch (err) {
//         console.error("Error adding trip:", err);
//         throw new Error("Failed to add trip");
//       }
//     },
//     deleteTrip: async (
//       _parent: unknown,
//       { id }: { id: string },
//       context: any
//     ) => {
//       try {
//         const token = context.req.headers.authorization?.split(" ")[1];
//         if (!token) throw new Error("Unauthorized");

//         const decoded = jwt.verify(
//           token,
//           process.env.JWT_SECRET!
//         ) as JwtPayload;
//         const userId = decoded.data.id;

//         const trip = await Trip.findOne({ _id: id, userId });
//         if (!trip) throw new Error("Trip not found or not authorized");

//         await Trip.findByIdAndDelete(id);
//         return true;
//       } catch (err) {
//         console.error("Error deleting trip:", err);
//         throw new Error("Failed to delete trip");
//       }
//     },
//   },
// };

// export default resolvers;
