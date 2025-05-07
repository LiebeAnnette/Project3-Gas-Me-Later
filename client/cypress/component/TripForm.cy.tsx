import React from "react";
import TripForm from "../../src/components/TripForm";

describe("<TripForm />", () => {
  it("fills and submits the form correctly", () => {
    const handleSubmit = cy.stub().as("handleSubmit");

    cy.mount(<TripForm onSubmit={handleSubmit} />);

    cy.get('input[placeholder="e.g., Kansas City"]').type("Kansas City");
    cy.get('input[placeholder="e.g., Hot Springs"]').type("Hot Springs");
    cy.get('input[type="number"]').type("401");
    cy.get('input[type="date"]').type("2025-06-21");
    cy.get('button[type="submit"]').click();

    cy.get("@handleSubmit").should("have.been.calledOnceWith", {
      startLocation: "Kansas City",
      endLocation: "Hot Springs",
      miles: 401,
      date: "2025-06-21",
    });
  });
});
