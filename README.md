# 🛒 E-Commerce Site (MERN Stack + Cypress Testing)

This is a full-stack e-commerce application built with:

- **Frontend:** React + Vite + MUI + Context API
- **Backend:** Express + MongoDB + JWT Auth + Bcrypt
- **Testing:** Cypress (E2E Tests)

---

## 🚀 Features

✅ User Authentication (Signup/Login with JWT)  
✅ Add to Cart (Protected functionality)  
✅ Product Listing Page  
✅ Cart Page with Checkout  
✅ Responsive UI (MUI-based)  
✅ Cypress E2E Tests with intercepts and fixtures

---

## 🧑‍💻 Tech Stack

### Frontend
- React + Vite
- Material UI (MUI)
- Axios
- React Router DOM
- Context API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Bcrypt for password hashing

### Testing
- Cypress (E2E testing)
- Fixtures, Intercepts, Custom Commands

---








## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shekhu04/E-commerce-assignment.git
cd E-commerce site
```

---
### 2. Setup Backend


```bash
cd backend
npm install

```
#### Create a .env file
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

#### Run the backend
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

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
### 8. Sample Cypress Features Tested

- Authenticated user login flow

- Add to cart functionality

- Cart page behavior

- Checkout clears cart

- Fixtures for user data

- Intercepted API calls using cy.intercept

---
### 9. Sample Fixtures (frontend/cypress/fixtures/)

user.json
```bash
{
  "email": "shikhar@example.com",
  "password": "123456",
  "firstName": "Shikhar",
  "lastName": "Gupta"
}
```

authResponse.json
```bash
{
  "token": "mocked-jwt-token",
  "user": {
    "email": "shikhar@example.com",
    "firstName": "Shikhar",
    "lastName": "Gupta"
  }
}
```
### 10. Future Improvements

- Add user profile management

- Integrate payment gateway

- Add product search and filtering

- Admin dashboard
### Author

Shikhar Gupta



