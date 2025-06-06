# 🛒 E-commerce Auth App

A beginner-friendly React project that showcases products (iPhone 15, MacBook, Apple watch etc) and allows users to **view more details** and **add the product to cart**, but only **after logging in**. It uses Material UI for UI, Context API for auth state, and Cypress for end-to-end testing.

---

## 🚀 Features

- ✅ User Login/Logout using custom `AuthContext`
- ✅ View product cards (e.g., iPhone 15)
- ✅ Authenticated users can view more product details
- ✅ Add to Cart (only if logged in)
- ✅ Cart page with product list and checkout option
- ✅ Navigation bar with protected routing
- ✅ Cypress E2E tests for major flows

---
## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router
- **UI Components:** Material UI
- **State:** Local state and AuthContext
- **Testing:** Cypress

---




## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shekhu04/E-commerce-assignment.git
cd E-commerce site
```

---
### 2. Installation


```bash
  npm install
```

---
    
### 3. Start the development server

```bash
npm start
```

Open your browser at http://localhost:5173

---
### 4. Image Setup

Place an iPhone. Macbook, Apple watch and AirPods image in the public/ folder with the filename iphone.jpg, macbook.jpg, watch.jpg, airpods.jpg.

---
### 5. Cart Functionality

- Products can be added to the cart only after login.

- Cart items are listed on the Cart Page.

- Cart state is preserved across authenticated routes.

---
### 6. Cypress Test Instructions 

### 1.Install Cypress
```bash
npm install cypress --save-dev
```

### 2.Running Cypress test cases
#### ▶️ Option 1: Cypress GUI

```bash
npx cypress open
```
- Choose E2E Testing

- Select a browser

- Run product_auth.cy.js


#### 🔁 Option 2: Cypress in Terminal (Headless)

```bash
npx cypress run
```

- This runs all specs in headless mode


### 3.Cypress Config

Ensure your cypress.config.js contains:

```bash
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // plugins or event listeners
    },
  },
});
```

### 4.Custom Cypress Command
To keep tests clean and reusable, we define custom Cypress commands in
cypress/support/commands.js. These commands simplify repetitive actions like logging in.

 File: cypress/support/commands.js

Ensure your cypress/support/commands.js contains:
```bash
Cypress.Commands.add("loginAndAddToCart", () => {
  cy.visit("/login");
  cy.contains("Click to Login").click();
  cy.url().should("include", "/profile");
  cy.contains("Product").click();
  cy.contains("Add to Cart").eq(0).click();
});
```

---




### 7. Test Coverage

✅ Authenticated User Flow
- Login

- View product details

- Add to Cart

- View Cart

- Checkout 

✅ Unauthenticated User Flow
- Sees product image

- Cannot view full product specs

- Cannot access cart or checkout

---
### 8. Author

Shikhar Gupta
---
