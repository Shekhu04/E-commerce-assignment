describe("Product Access Based on Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(" Authenticated User Accesses Product and Logs In", () => {
    
    cy.contains("Login").click();
    cy.contains("Login Page").should("exist");
    cy.contains("Click to Login").click();
    cy.url().should("include", "/profile");
    cy.contains("Welcome You are logged in.").should("exist");
    cy.contains("Product").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("View More").should("be.enabled").click();
    cy.contains("Camera:").should("exist");
    cy.contains("Battery:").should("exist");
    cy.contains("Display:").should("exist");
    cy.contains("Price:").should("exist");
  });

  it("Unauthenticated User Sees Product Without Login", () => {
    cy.contains("iPhone 15").should("be.visible");
    cy.contains("Apple A17 Pro, 128GB, Dynamic Island").should("be.visible");
    cy.get('img[alt="iPhone 15"]').should("have.attr", "src").and("include", "iphone.jpg");
    cy.contains("Login to View More").should("be.visible").and("be.disabled");
    cy.contains("Camera:").should("not.exist");
    cy.contains("Battery:").should("not.exist");
    cy.contains("Display:").should("not.exist");
    cy.contains("Price:").should("not.exist");
  });
  
});
