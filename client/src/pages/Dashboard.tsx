import React, { useState } from "react";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import type { TripProps } from "../types/Trip"; // if you moved it, otherwise from TripCard

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);

  const addTrip = (newTrip: TripProps) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Trips</h1>
      <TripForm onSubmit={addTrip} />
      <hr style={{ margin: "2rem 0" }} />
      <TripList trips={trips} />
    </div>
  );
};

export default Dashboard;
