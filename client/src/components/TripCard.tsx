import React from "react";
import type { TripProps } from "../types/Trip";

const TripCard: React.FC<{
  trip: TripProps;
  onDelete?: (id: string) => void;
}> = ({ trip, onDelete }) => {
  const formattedDate = new Date(trip.date).toLocaleDateString();

  return (
    <div
      className="trip-card"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>
        {trip.startLocation} ➡️ {trip.endLocation}
      </h3>
      <p>
        <strong>Miles:</strong> {trip.miles}
      </p>
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      {onDelete && trip._id && (
        <button onClick={() => onDelete(trip._id)}>Delete</button>
      )}
    </div>
  );
};

export default TripCard;