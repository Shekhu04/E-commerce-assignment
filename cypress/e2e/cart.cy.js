
describe("Cart Page Functionality", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("1. Shows empty message if no items in cart", () => {
    cy.visit("/login");
    cy.contains("Click to Login").click();
    cy.url().should("include", "/profile");
    cy.contains("Cart").click();
    cy.contains("Your cart is empty.").should("exist");
  });

  it("2. Displays added products and total price", () => {
    cy.loginAndAddToCart();
    cy.contains("Cart").click();
    cy.contains("iPhone 15").should("exist");
    cy.contains("Total: ₹").should("exist");
    cy.contains("Checkout").should("exist");
  });

  it("3. Checkout clears the cart", () => {
    cy.loginAndAddToCart();
    cy.contains("Cart").click();
    cy.contains("Checkout").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Checkout successful!");
    });
    cy.contains("Your cart is empty.").should("exist");
  });

  it("4. When cart is empty, no Checkout button is shown", () => {
    cy.visit("/login");
    cy.contains("Click to Login").click();
    cy.url().should("include", "/profile");
    cy.contains("Cart").click();
    cy.contains("Your cart is empty.").should("exist");
    cy.contains("Checkout").should("not.exist");
  });
  
});
