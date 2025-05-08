import React, { useEffect, useState } from "react";
import type { TripProps } from "../types/Trip";
import { getWeather } from "../utils/getWeather";
import { getCoords } from "../utils/getCoords";

const TripCard: React.FC<{
  trip: TripProps;
  onDelete?: (id: string) => void;
}> = ({ trip, onDelete }) => {
  const formattedDate = new Date(trip.date).toLocaleDateString();

  const [weather, setWeather] = useState<null | {
    temp: number;
    description: string;
  }>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = await getCoords(trip.endLocation);
      if (!coords) return;

      const data = await getWeather(coords.lat, coords.lon, trip.date);
      if (data) {
        setWeather(data);
      }
    };

    fetchWeather();
  }, [trip.endLocation, trip.date]);

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
      {weather && (
        <p>
          <strong>Weather:</strong> {weather.temp}°F, {weather.description}
        </p>
      )}
      {onDelete && trip._id && (
        <button onClick={() => onDelete(trip._id)}>Delete</button>
      )}
    </div>
  );
};

export default TripCard;
