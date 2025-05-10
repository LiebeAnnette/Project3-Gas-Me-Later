import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import { getUserFromToken } from "../utils/auth";
import { getChuckFact } from "../utils/getChuckFact";
import chuckImage from "../assets/Chungkingosaurus.jpg";

import { GET_TRIPS, GET_TOTAL_MILES } from "../graphql/queries";
import { ADD_TRIP, DELETE_TRIP } from "../graphql/mutations";
import type { NewTrip, SavedTrip } from "../types/Trip";

const Dashboard: React.FC = () => {
  const user = getUserFromToken();
  const navigate = useNavigate();

  const [chuckFact, setChuckFact] = useState<string | null>(null);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [totalMiles, setTotalMiles] = useState<number | null>(null);

  const { data: tripData, refetch: refetchTrips } = useQuery(GET_TRIPS);
  const { data: milesData, refetch: refetchMiles } = useQuery(GET_TOTAL_MILES);
  const [addTripMutation] = useMutation(ADD_TRIP);
  const [deleteTripMutation] = useMutation(DELETE_TRIP);

  useEffect(() => {
    if (tripData?.getTrips) setTrips(tripData.getTrips);
    if (milesData?.getTotalMiles) setTotalMiles(milesData.getTotalMiles);
  }, [tripData, milesData]);

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

  const addTrip = async (newTrip: NewTrip) => {
    try {
      const { data } = await addTripMutation({ variables: newTrip });
      if (data?.addTrip) {
        setTrips((prev) => [...prev, data.addTrip]);
        await refetchMiles();
      }
    } catch (err) {
      console.error("Error adding trip:", err);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      const { data } = await deleteTripMutation({ variables: { id } });
      if (data?.deleteTrip) {
        setTrips((prev) => prev.filter((trip) => trip._id !== id));
        await refetchMiles();
      }
    } catch (err) {
      console.error("Error deleting trip:", err);
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

      {totalMiles !== null && (
        <div style={{ margin: "1rem 0", fontWeight: "bold" }}>
          Total Miles Logged: {totalMiles}
        </div>
      )}

      <TripForm onSubmit={addTrip} />
      <hr style={{ margin: "2rem 0" }} />
      <TripList trips={trips} onDelete={deleteTrip} />
    </div>
  );
};

export default Dashboard;
