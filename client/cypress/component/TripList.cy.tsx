import React from "react";
import TripList from "../../src/components/TripList";
import { TripProps } from "../../src/components/TripCard";

describe("<TripList />", () => {
  const mockTrips: TripProps[] = [
    {
      startLocation: "Kansas City",
      endLocation: "Hot Springs",
      miles: 401,
      date: "2025-06-21",
    },
    {
      startLocation: "Liberty",
      endLocation: "Omaha",
      miles: 220,
      date: "2025-06-22",
    },
  ];

  it("renders multiple trip cards correctly", () => {
    cy.mount(<TripList trips={mockTrips} />);
    cy.contains("Kansas City ➡️ Hot Springs");
    cy.contains("Liberty ➡️ Omaha");
    cy.contains("Miles: 401");
    cy.contains("Miles: 220");
  });

  it("renders fallback message when no trips are present", () => {
    cy.mount(<TripList trips={[]} />);
    cy.contains("No trips logged yet.");
  });
});
