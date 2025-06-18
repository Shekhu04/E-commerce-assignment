import React, { useState } from "react";
import { Container, Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const AuthPage = () => {
  // Toggle between Sign Up and Login mode
  const [isSignup, setIsSignup] = useState(false);

  // Store form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // For page navigation
  const { login } = useAuth(); // Access login method from context

  // Update formData state when input fields change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Switch between Signup and Login modes
  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  // Handle user Signup
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      const { token, user } = res.data;

      // Save auth token and user info to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(token); // Set login state in context
      navigate("/profile"); // Redirect to profile
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  // Handle user Login
  const handleLogin = async () => {
    try {
      const { email, password } = formData;

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save auth token and user info to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(token); // Set login state in context
      navigate("/profile"); // Redirect to profile
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Trigger appropriate handler based on mode
  const handleSubmit = () => {
    isSignup ? handleSignup() : handleLogin();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          {isSignup ? "Sign Up" : "Login"} Page
        </Typography>

        {/* First and Last Name fields only shown in Signup mode */}
        {isSignup && (
          <>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
            />
          </>
        )}

        {/* Email and Password fields (common) */}
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {isSignup ? "Click to Sign Up" : "Click to Login"}
        </Button>

        {/* Toggle Mode Button */}
        <Button variant="text" sx={{ mt: 2 }} onClick={toggleMode}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;
