import React from "react";
import TripCard from "./TripCard";
import type { SavedTrip } from "../types/Trip";

type TripListProps = {
  trips: SavedTrip[];
  onDelete?: (id: string) => void;
};

const TripList: React.FC<TripListProps> = ({ trips, onDelete }) => {
  if (trips.length === 0) {
    return <p>No trips logged yet.</p>;
  }

  return (
    <div>
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TripList;
