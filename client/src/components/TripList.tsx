import React from "react";
import TripCard from "./TripCard";
import type { TripProps } from "./TripCard";

type TripListProps = {
  trips: TripProps[];
};

const TripList: React.FC<TripListProps> = ({ trips }) => {
  if (trips.length === 0) {
    return <p>No trips logged yet.</p>;
  }

  return (
    <div>
      {trips.map((trip, index) => (
        <TripCard key={index} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
