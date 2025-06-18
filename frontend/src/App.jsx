import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./components/product";
import Login from "./components/login";
import Profile from "./components/profile";
import Navbar from "./components/navbar";
import Cart from "./components/cart";

import { AuthProvider, useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const AppRoutes = () => {
  const auth = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Product
              isAuthenticated={auth.isAuthenticated}
              key={auth.isAuthenticated ? "loggedin" : "loggedout"}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
