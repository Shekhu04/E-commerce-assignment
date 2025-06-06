Cypress.Commands.add("loginAndAddToCart", () => {
  cy.visit("/login");
  cy.contains("Click to Login").click();

  // Wait for redirection to /profile
  cy.url().should("include", "/profile");

  // Go to products page
  cy.contains("Product").click();

  // Add a item
  cy.contains("Add to Cart").eq(0).click();

});
