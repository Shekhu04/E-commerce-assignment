/// <reference types="cypress" />

describe("Add Product Page", () => {
  beforeEach(() => {
    // Simulate login by setting a valid token in localStorage
    localStorage.setItem("token", "mocked_token");

    // Visit the Add Product page
    cy.visit("/add-product");
  });

  it("should render form fields and successfully submit product using mocked POST request", () => {
    // Intercept the POST request to /api/products and mock the response
    cy.intercept("POST", "http://localhost:5000/api/products", {
      statusCode: 201,
      body: {
        message: "Product added successfully",
      },
    }).as("addProduct");

    // Fill the form
    cy.get('input[name="name"]').type("Cypress Test Phone");
    cy.get('input[name="image"]').type("test-phone.jpg");
    cy.get('input[name="details"]').type(
      "Test 5G smartphone with AMOLED display"
    );
    cy.get('input[name="price"]').type("29999");
    cy.get('textarea[name="specs"]').type(
      "6.5 inch display, 5000mAh battery, Snapdragon 8 Gen 1"
    );

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the intercepted POST request and verify request body
    cy.wait("@addProduct")
      .its("request.body")
      .should((body) => {
        expect(body.name).to.equal("Cypress Test Phone");
        expect(body.image).to.equal("test-phone.jpg");
        expect(body.details).to.contain("AMOLED display");
        expect(body.price).to.equal(29999);
        expect(body.specs).to.deep.equal([
          "6.5 inch display",
          "5000mAh battery",
          "Snapdragon 8 Gen 1",
        ]);
      });

    // Assert alert is shown
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Product added successfully!");
    });

    // Check if form resets after submission
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('textarea[name="specs"]').should("have.value", "");
  });
});
