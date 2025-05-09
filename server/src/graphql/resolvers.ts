type ResolverContext = any; // Replace with proper context type later
// server/src/graphql/resolvers.ts
import Trip from "../models/Trip.js";

const resolvers = {
  Query: {
    getTrips: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const trips = await Trip.find();
        return trips;
      } catch (err) {
        console.error("Error fetching trips:", err);
        throw new Error("Failed to get trips");
      }
    },
  },
  Mutation: {
    addTrip: async (_parent: unknown, args: any, context: any) => {
      try {
        const newTrip = await Trip.create({ ...args, userId: "user123" });
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
        const deleted = await Trip.findByIdAndDelete(id);
        return !!deleted;
      } catch (err) {
        console.error("Error deleting trip:", err);
        throw new Error("Failed to delete trip");
      }
    },
  },
};

export default resolvers;
