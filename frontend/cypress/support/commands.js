Cypress.Commands.add("loginAndAddToCart", () => {
  cy.visit("/login");

  // Click login button
  cy.contains("Click to Login").click();

  // Ensure user lands on /profile
  cy.url().should("include", "/profile");

  // Navigate to products page
  cy.contains("Product").click();
  cy.url().should("include", "/");

  // Add the first product to cart
  cy.get("button").contains("Add to Cart").first().click();

  // Capture the product name and price dynamically for later use
  cy.get("button")
    .contains("Added to Cart")
    .parentsUntil("div.MuiCardContent-root") // Traverse to CardContent
    .parent()
    .within(() => {
      cy.get("h6").then(($name) => {
        const name = $name.text().trim();
        cy.get("p")
          .contains(/^Price:/)
          .then(($priceText) => {
            const price = parseInt($priceText.text().replace(/[^\d]/g, ""));
            // Store product as alias
            cy.wrap([{ name, price }]).as("cartProducts");
          });
      });
    });
});
