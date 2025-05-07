import React, { useState, FormEvent } from "react";

type TripFormProps = {
  onSubmit: (trip: {
    startLocation: string;
    endLocation: string;
    miles: number;
    date: string;
  }) => void;
};

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [miles, setMiles] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      startLocation,
      endLocation,
      miles: parseFloat(miles),
      date,
    });

    // Reset the form
    setStartLocation("");
    setEndLocation("");
    setMiles("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Location:
        <input
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="e.g., Kansas City"
        />
      </label>

      <label>
        End Location:
        <input
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          placeholder="e.g., Hot Springs"
        />
      </label>

      <label>
        Miles:
        <input
          type="number"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <button type="submit">Submit Trip</button>
    </form>
  );
};

export default TripForm;
