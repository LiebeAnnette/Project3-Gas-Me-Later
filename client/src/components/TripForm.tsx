import React, { useState } from "react";
import type { FormEvent } from "react";
import { getMiles } from "../utils/getMiles";
import { getCoords } from "../utils/getCoords";
import { getWeather } from "../utils/getWeather";

type TripFormProps = {
  onSubmit: (trip: {
    startLocation: string;
    endLocation: string;
    miles: number;
    date: string;
    weather?: {
      temp: number;
      description: string;
    };
  }) => void;
};

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [startAddress, setStartAddress] = useState("");
  const [startCity, setStartCity] = useState("");
  const [startState, setStartState] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [endCity, setEndCity] = useState("");
  const [endState, setEndState] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fullStart = `${startAddress}, ${startCity}, ${startState}`;
    const fullEnd = `${endAddress}, ${endCity}, ${endState}`;

    const calculatedMiles = await getMiles(fullStart, fullEnd);
    if (calculatedMiles === null) {
      alert("Could not calculate miles. Check addresses.");
      return;
    }

    const coords = await getCoords(fullEnd);
    let weather = null;

    if (coords) {
      weather = await getWeather(coords.lat, coords.lon, date);
    }

    onSubmit({
      startLocation: fullStart,
      endLocation: fullEnd,
      miles: calculatedMiles,
      date,
      weather: weather || undefined,
    });

    // Reset the form
    setStartAddress("");
    setStartCity("");
    setStartState("");
    setEndAddress("");
    setEndCity("");
    setEndState("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Start Location</legend>
        <label>
          Address:
          <input value={startAddress} onChange={(e) => setStartAddress(e.target.value)} />
        </label>
        <label>
          City:
          <input value={startCity} onChange={(e) => setStartCity(e.target.value)} />
        </label>
        <label>
          State:
          <input value={startState} onChange={(e) => setStartState(e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>End Location</legend>
        <label>
          Address:
          <input value={endAddress} onChange={(e) => setEndAddress(e.target.value)} />
        </label>
        <label>
          City:
          <input value={endCity} onChange={(e) => setEndCity(e.target.value)} />
        </label>
        <label>
          State:
          <input value={endState} onChange={(e) => setEndState(e.target.value)} />
        </label>
      </fieldset>

      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <button type="submit">Submit Trip</button>
    </form>
  );
};

export default TripForm;
