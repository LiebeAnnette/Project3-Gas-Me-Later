import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import type { TripProps } from "../types/Trip";
import { getUserFromToken } from "../utils/auth";
import { useEffect } from "react";
import { getChuckFact } from "../utils/getChuckFact";
import chuckImage from "../assets/Chungkingosaurus.jpg"; // adjust path as needed

const Dashboard: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);
  const user = getUserFromToken();
  const navigate = useNavigate();
  const [chuckFact, setChuckFact] = useState<string | null>(null);

  useEffect(() => {
    const loadFact = async () => {
      const fact = await getChuckFact();
      setChuckFact(fact);
    };

    loadFact();
  }, []);

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
  const deleteTrip = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/trips/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete trip");
      }

      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      {chuckFact && (
        <div
          style={{
            background: "#ffe",
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "2rem",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>
              For no reason at all, here’s what <strong>Chuck Norris</strong>{" "}
              has to say:
            </p>
            <p>{chuckFact}</p>
            <button
              onClick={async () => {
                const newFact = await getChuckFact();
                setChuckFact(newFact);
              }}
            >
              Get New Fact
            </button>
          </div>
          <img
            src={chuckImage}
            alt="Chuck Norris"
            style={{ maxHeight: "120px", borderRadius: "6px" }}
          />
        </div>
      )}

      <h1>My Trips</h1>

      {user && (
        <>
          <p>Welcome back, {user.username}!</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}

      <TripForm onSubmit={addTrip} />
      <hr style={{ margin: "2rem 0" }} />
      <TripList trips={trips} onDelete={deleteTrip} />
    </div>
  );
};

export default Dashboard;
