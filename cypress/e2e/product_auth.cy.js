describe("Authenticated User Flow", () => {
  it("logs in and accesses product page with cart functionality", () => {
    // Visit login page
    cy.visit("/login");

    // Click login button
    cy.contains("Click to Login").click();

    // Should redirect to profile
    cy.url().should("include", "/profile");
    cy.contains("Welcome You are logged in.");

    // Navigate to product page
    cy.contains("Product").click();

    // Confirm presence of product details
    cy.contains("iPhone 15").should("exist");
    cy.contains("Add to Cart").should("exist");

    // Add product to cart
    cy.contains("Add to Cart").first().click();

    // Button should change to 'Added to Cart'
    cy.contains("Added to Cart").should("exist");

    // Navigate to cart
    cy.contains(/Cart \(1\)/).click();

    // Validate product is listed in cart
    cy.contains("iPhone 15").should("exist");
    cy.contains("Total: ₹79990").should("exist");
  });
});

describe("Unauthenticated User Product Access", () => {
  it("should show products but restrict adding to cart", () => {
    // Visit product page directly
    cy.visit("/");

    // Ensure product names are visible
    cy.contains("MacBook Pro").should("exist");
    cy.contains("Apple Watch Series 9").should("exist");

    // Cart and logout buttons should NOT exist
    cy.contains("Cart").should("not.exist");
    cy.contains("Logout").should("not.exist");

    // Add to Cart should be replaced with Login warning
    cy.contains("Login to view & add to cart").should("exist");

    // Specs and price should not be visible
    cy.contains("Apple A17 Pro").should("not.exist");
    cy.contains("Price: ₹79,990").should("not.exist");
  });
});
  
