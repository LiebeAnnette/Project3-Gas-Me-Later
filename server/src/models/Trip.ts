import { Schema, model, Document } from "mongoose";

// Define the Trip interface
export interface ITrip extends Document {
  startLocation: string;
  endLocation: string;
  date: Date;
  miles: number;
  userId: string; // Reference to the user who created this trip
}

// Define the Trip schema
const tripSchema = new Schema<ITrip>({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  date: { type: Date, required: true },
  miles: { type: Number, required: true },
  userId: { type: String, required: true }, // We'll store the user's ID
});

const Trip = model<ITrip>("Trip", tripSchema);

export default Trip;
