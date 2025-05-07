import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import type { TripProps } from "../types/Trip";
import { getUserFromToken } from "../utils/auth";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);
  const user = getUserFromToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addTrip = async (newTrip: TripProps) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTrip),
      });

      if (!response.ok) {
        throw new Error("Failed to save trip");
      }

      const savedTrip = await response.json();
      setTrips((prev) => [...prev, savedTrip]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load trips");
        }

        const data = await response.json();
        setTrips(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
  }, []);

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
