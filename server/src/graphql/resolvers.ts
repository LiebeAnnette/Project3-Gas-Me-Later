type ResolverContext = any; // Replace with proper context type later
import Trip from "../models/Trip.js";

const resolvers = {
  Query: {
    getTrips: async (_parent: unknown, _args: unknown, context: any) => {
      try {
        const trips = await Trip.find(); // You can filter by user later
        return trips;
      } catch (err) {
        console.error("Error fetching trips:", err);
        throw new Error("Failed to get trips");
      }
    },
  },
  Mutation: {
    addTrip: async (_parent: unknown, args: any, context: ResolverContext) => {
      try {
        const newTrip = await Trip.create({
          ...args,
          userId: "user123", // Replace this with user ID from JWT later
        });
        return newTrip;
      } catch (err) {
        console.error("Error adding trip:", err);
        throw new Error("Failed to add trip");
      }
    },

    deleteTrip: async (
      _parent: unknown,
      { id }: { id: string },
      context: ResolverContext
    ) => {
      return true;
    },
  },
};

export default resolvers;
