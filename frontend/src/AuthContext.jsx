import React, { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the app and provide auth-related state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login state
  const [cart, setCart] = useState([]); // Stores products added to cart

  // Check if user is already logged in by verifying token in localStorage (on initial load)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function to store token and update auth state
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Logout function to clear token, cart, and reset states
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
    setCart([]);
  };

  // Add product to cart if not already present
  const addToCart = (product) => {
    const isAlreadyAdded = cart.some((item) => item.name === product.name);
    if (!isAlreadyAdded) {
      setCart((prev) => [...prev, product]);
    }
  };

  // Clears the entire cart
  const clearCart = () => setCart([]);

  // Provide auth and cart-related functions and state to children components
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, cart, addToCart, clearCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in components
export const useAuth = () => useContext(AuthContext);
