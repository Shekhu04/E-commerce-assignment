describe("Authenticated User Flow", () => {
  beforeEach(() => {
    cy.fixture("user").as("userData");
    cy.fixture("authResponse").as("authRes");
  });

  it("logs in and accesses product page with cart functionality", function () {
    // Intercept login API call
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Visit login page
    cy.visit("/login");

    // Assert login button is a <button>
    cy.contains("Click to Login").should("have.prop", "tagName", "BUTTON");

    // Click login button
    cy.contains("Click to Login").click();

    // Wait for login request
    cy.wait("@login");

    // Check user is redirected to profile
    cy.url().should("include", "/profile");
    cy.contains("Welcome, Shikhar Gupta");

    // Navigate to product page
    cy.contains("Product").click();

    // Verify product name is shown
    cy.contains("iPhone 15").should("exist");

    // Click 'Add to Cart' button and verify it's a <button>
    cy.contains("Add to Cart")
      .first()
      .should("have.prop", "tagName", "BUTTON")
      .click();

    // Check button changes after adding to cart
    cy.contains("Added to Cart").should("exist");

    // Go to cart page
    cy.contains(/Cart \(1\)/).click();

    // Confirm cart contents
    cy.contains("iPhone 15").should("exist");
    cy.contains("Total: ₹79990").should("exist");
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
    cy.contains("Click to Sign Up").should("have.prop", "tagName", "BUTTON").click();

    // Wait for signup request
    cy.wait("@signup");

    // Assert redirection and welcome message
    cy.url().should("include", "/profile");
    cy.contains("Welcome, Shikhar Gupta");
  });
});
