import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Custom hook to access auth state and functions

const Navbar = () => {
  // Destructure auth values from context
  const { isAuthenticated, logout, cart } = useAuth();

  return (
    // AppBar for top navigation bar
    <AppBar position="static">
      <Toolbar>
        {/* App title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-commerce App
        </Typography>

        {/* Link to Product page */}
        <Button color="inherit" component={Link} to="/">
          Product
        </Button>

        {/* Show Cart button only if user is logged in */}
        {isAuthenticated && (
          <Button color="inherit" component={Link} to="/cart">
            Cart ({cart.length})
          </Button>
        )}

        {/* Conditionally show Login or Logout based on auth state */}
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
