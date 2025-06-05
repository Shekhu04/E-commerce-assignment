import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/profile");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <Button variant="contained" onClick={handleLogin}>
          Click to Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
