import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    setIsAuthenticated(storedAuth === "true");
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCart([]); 
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
  };
  

  const addToCart = (product) => {
    const isAlreadyAdded = cart.some((item) => item.name === product.name);
    if (!isAlreadyAdded) {
      setCart((prev) => [...prev, product]);
    }
  };
  
  const clearCart = () => setCart([]);


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, cart, addToCart, clearCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
