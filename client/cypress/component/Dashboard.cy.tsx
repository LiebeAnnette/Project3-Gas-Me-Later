import React from "react";
import Dashboard from "../../src/pages/Dashboard";

describe("<Dashboard />", () => {
  it("renders header, form, and initially empty list", () => {
    cy.mount(<Dashboard />);
    cy.contains("My Trips");
    cy.contains("No trips logged yet.");
  });

  it("adds a trip to the list", () => {
    cy.mount(<Dashboard />);
    cy.get('input[placeholder="e.g., Kansas City"]').type("KC");
    cy.get('input[placeholder="e.g., Hot Springs"]').type("HS");
    cy.get('input[type="number"]').type("401");
    cy.get('input[type="date"]').type("2025-06-21");
    cy.get('button[type="submit"]').click();

    cy.contains("KC ➡️ HS");
    cy.contains("Miles: 401");
  });
});
