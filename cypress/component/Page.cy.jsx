import React from "react";
import Page from "../../src/Page";

describe("Page />", () => {
  it("displays the correct initial biography", () => {
    cy.mount(<Page />);
    cy.contains("i", "Loading...").should("exist"); // Verify loading state
    cy.contains("i", "This is Alice's bio.").should("exist");
  });

  it("updates the biography correctly when a new person is selected", () => {
    cy.mount(<Page />);
    cy.get("select").select("Bob");
    cy.contains("i", "Loading...").should("exist"); // Optional, may not be caught if the loading is too fast
    cy.contains("i", "This is Bob's bio.").should("exist");
    cy.get("select").select("Taylor");
    cy.contains("i", "This is Taylor's bio.").should("exist"); // Verify Taylor's bio is displayed without race condition issues
  });

  it("handles race conditions correctly when quickly changing selected person", () => {
    cy.mount(<Page />);
    // Simulate quickly changing selection from "Bob" to "Taylor"
    cy.get("select").select("Bob");
    cy.get("select").select("Taylor");
    // Assert that Taylor's bio is displayed, indicating the race condition is handled
    cy.contains("i", "This is Taylor's bio.").should("exist");
    // Note: This test assumes immediate response from the mock or intercepted API and may need adjustments based on actual response times.
  });
});
