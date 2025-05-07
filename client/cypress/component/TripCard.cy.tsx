import React from "react";
import TripCard, { TripProps } from "../../src/components/TripCard";

describe("<TripCard />", () => {
  const testTrip: TripProps = {
    startLocation: "Kansas City",
    endLocation: "Hot Springs",
    miles: 401,
    date: new Date().toISOString(),
  };

  it("renders trip details correctly", () => {
    cy.mount(<TripCard trip={testTrip} />);
    cy.contains("Kansas City ➡️ Hot Springs");
    cy.contains("Miles: 401");
    cy.contains("Date:"); // Loosely check the date is shown
  });
});
