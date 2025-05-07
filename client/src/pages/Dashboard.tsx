import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import type { TripProps } from "../types/Trip";
import { getUserFromToken } from "../utils/auth";

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);
  const user = getUserFromToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addTrip = (newTrip: TripProps) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Trips</h1>
      {user && (
        <>
          <p>Welcome back, {user.username}!</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}

      <TripForm onSubmit={addTrip} />
      <hr style={{ margin: "2rem 0" }} />
      <TripList trips={trips} />
    </div>
  );
};

export default Dashboard;
