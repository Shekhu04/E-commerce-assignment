import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Access logout function from AuthContext
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle logout action
  const handleLogout = () => {
    logout(); // Clear auth context/session
    localStorage.removeItem("token"); // Remove token from storage
    localStorage.removeItem("user"); // Remove user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {/* Profile card */}
      <Paper elevation={4} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
        {/* User avatar with initials */}
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
          }}
        >
          {user?.firstName?.[0] || "U"}
        </Avatar>

        {/* Welcome message with user name */}
        <Typography variant="h5" gutterBottom>
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>

        {/* Display user email */}
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Email: {user?.email}
        </Typography>

        {/* Logout button */}
        <Box mt={4}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
