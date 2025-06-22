import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Safely retrieve user data
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined") {
      user = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Invalid user data:", err);
  }

  // Handle logout
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle redirect to products
  const goToProducts = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 4,
          background: "#f5f5f5",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            fontSize: 32,
          }}
        >
          {user?.firstName?.[0]?.toUpperCase() || "U"}
        </Avatar>

        {/* User Name */}
        <Typography variant="h5" gutterBottom>
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>

        {/* Email */}
        <Typography variant="body1" color="text.secondary">
          Email: {user?.email}
        </Typography>

        {/* Actions */}
        <Stack spacing={2} mt={4} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={goToProducts}
          >
            Go to Products
          </Button>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
