import React from "react";

export type TripProps = {
  startLocation: string;
  endLocation: string;
  miles: number;
  date: string; // ISO string
};

const TripCard: React.FC<{ trip: TripProps }> = ({ trip }) => {
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
    </div>
  );
};

export default TripCard;
