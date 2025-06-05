#  Product Auth App

A beginner-level React app that displays a product (iPhone 15) and allows users to view more details **only after logging in**. It uses Material UI for UI components, React Router for navigation, and Context API with `localStorage` for managing authentication. Cypress is used for end-to-end testing.

---

##  Features

-  Login & Logout using React Context
-  Authentication stored in localStorage (persists on refresh)
-  View product details only after login
-  Protected routes using custom `ProtectedRoute`
-  Styled using Material UI (MUI)
-  End-to-End testing with Cypress

---

## Tech Stack
- React
- React Router DOM
- Material UI (MUI)
- Context API + localStorage
- Cypress (for testing)
  
---

##  Folder Structure

src/
│
├── components/
│ ├── product.jsx 
│ ├── login.jsx 
│ ├── profile.jsx 
│ └── navbar.jsx 
│
├── AuthContext.js 
├── App.jsx 
└── main.jsx


---

##  Getting Started

### 1. Clone the repository
git clone https://github.com/Shekhu04/E-commerce-assignment.git
cd E-commerce site

### 2. Install dependencies
npm install

### 3. Start the development server
npm start

Open http://localhost:5173 in your browser.

### 4. Image Setup
Place an image named iphone.jpg inside your public/ folder:

public/
└── iphone.jpg

You can download an iPhone 15 image from Google and save it with the filename iphone.jpg.

### 5. Run Cypress
npx cypress open
Then select the test file and run it from the Cypress Test Runner.


