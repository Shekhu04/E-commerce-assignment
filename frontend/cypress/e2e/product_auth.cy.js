describe("Signup Flow", () => {
  beforeEach(() => {
    cy.fixture("user").as("userData");
    cy.fixture("authResponse").as("authRes");
  });

  it("signs up a new user and navigates to profile", function () {
    // Intercept signup API call
    cy.intercept("POST", "**/api/auth/signup", {
      statusCode: 201,
      body: this.authRes,
    }).as("signup");

    // Go to login page
    cy.visit("/login");

    // Switch to sign-up mode
    cy.contains("Don't have an account? Sign Up").click();

    // Fill form fields
    cy.get('input[name="firstName"]').type(this.userData.firstName);
    cy.get('input[name="lastName"]').type(this.userData.lastName);
    cy.get('input[name="email"]').type(this.userData.email);
    cy.get('input[name="password"]').type(this.userData.password);

    // Ensure signup button is a <button> before clicking
    cy.contains("Click to Sign Up")
      .should("have.prop", "tagName", "BUTTON")
      .click();

    // Wait for signup request
    cy.wait("@signup");

    // Assert redirection and welcome message
    cy.url().should("include", "/profile");
    cy.contains(
      `Welcome, ${this.userData.firstName} ${this.userData.lastName}`
    );
  });
});

describe("Authenticated User Flow", () => {
  beforeEach(() => {
    cy.fixture("user").as("userData");
    cy.fixture("authResponse").as("authRes");
  });

  it("logs in and accesses product page with cart functionality", function () {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Use custom command that logs in and captures product info
    cy.loginAndAddToCart();
    cy.wait("@login");

    // Access stored product data from alias
    cy.get("@cartProducts").then(([product]) => {
      const formattedPrice = `₹${product.price}`;

      // Navigate to Cart
      cy.contains(/Cart \(\d+\)/).click();

      // Check product name and total price dynamically
      cy.contains(product.name).should("exist");
      cy.contains(formattedPrice).should("exist");
      cy.contains(`Total: ${formattedPrice}`).should("exist");
    });

    // Ensure Checkout button exists
    cy.contains("Checkout").should("exist");
  });
});

describe("Unauthenticated User Product Access", () => {
  it("shows products but restricts adding to cart", () => {
    // Visit home page directly (unauthenticated)
    cy.visit("/");

    // Check product titles are visible
    cy.contains("MacBook Pro").should("exist");
    cy.contains("Apple Watch Series 9").should("exist");

    // Ensure no cart or logout buttons
    cy.contains("Cart").should("not.exist");
    cy.contains("Logout").should("not.exist");

    // Confirm 'Login to view & add to cart' is visible as plain text, not a button
    cy.contains("Login to view & add to cart")
      .should("have.prop", "tagName")
      .and("not.eq", "BUTTON");

    // Ensure price and specs are hidden
    cy.contains("Apple A17 Pro").should("not.exist");
    cy.contains("Price: ₹79,990").should("not.exist");
  });
});
