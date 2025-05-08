import { Schema, model, Document } from "mongoose";

export interface ITrip extends Document {
  startLocation: string;
  endLocation: string;
  miles: number;
  date: string;
  userId: string;
  weather?: {
    description: string;
    temp: number;
    icon?: string;
  };
}

const tripSchema = new Schema<ITrip>({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  miles: { type: Number, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
});

const Trip = model<ITrip>("Trip", tripSchema);
export default Trip;
