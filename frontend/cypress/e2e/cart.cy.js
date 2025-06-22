describe("Cart Page Functionality", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.fixture("authResponse").as("authRes");
    cy.fixture("user").as("userData");
  });

  it("1. Shows empty message if no items in cart", function () {
    // Intercept login API
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Visit login page
    cy.visit("/login");

    // Ensure it's a button and click login
    cy.contains("Click to Login").should("have.prop", "tagName", "BUTTON");
    cy.contains("Click to Login").click();

    // Wait for login and redirect
    cy.wait("@login");
    cy.url().should("include", "/profile");

    // Go to Cart page
    cy.contains("Cart").should("have.prop", "tagName", "A");
    cy.contains("Cart").click();

    // Assert cart is empty
    cy.contains("Your cart is empty.").should("exist");
    cy.contains("Checkout").should("not.exist");
  });

  it("2. Displays added products and total price", function () {
    // Intercept login API
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Custom command to login and add product
    cy.loginAndAddToCart();

    // Go to Cart
    cy.contains("Cart").should("have.prop", "tagName", "A");
    cy.contains("Cart").click();

    // Check product and total price dynamically
    cy.get("@cartProducts").then((products) => {
      let total = 0;

      products.forEach((product) => {
        cy.contains(product.name).should("exist"); // Check product name
        cy.contains(`₹${product.price}`).should("exist"); // Check product price
        total += product.price;
      });

      // Check total price
      cy.contains(`Total: ₹${total}`).should("exist");

      // Check Checkout button
      cy.contains("Checkout").should("exist");
    });
  });

  it("3. Checkout clears the cart", function () {
    // Intercept login API
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Login and add product
    cy.loginAndAddToCart();

    // Go to Cart
    cy.contains("Cart").should("have.prop", "tagName", "A");
    cy.contains("Cart").click();

    // Perform checkout
    cy.contains("Checkout").should("have.prop", "tagName", "BUTTON");
    cy.contains("Checkout").click();

    // Handle alert and verify cart is cleared
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Checkout successful!");
    });
    cy.contains("Your cart is empty.").should("exist");
    cy.contains("Checkout").should("not.exist");
  });

  it("4. When cart is empty, no Checkout button is shown", function () {
    // Intercept login API
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: this.authRes,
    }).as("login");

    // Login
    cy.visit("/login");
    cy.contains("Click to Login").should("have.prop", "tagName", "BUTTON");
    cy.contains("Click to Login").click();
    cy.wait("@login");
    cy.url().should("include", "/profile");

    // Go to Cart
    cy.contains("Cart").should("have.prop", "tagName", "A");
    cy.contains("Cart").click();

    // Validate empty cart state
    cy.contains("Your cart is empty.").should("exist");
    cy.contains("Checkout").should("not.exist");
  });
});
