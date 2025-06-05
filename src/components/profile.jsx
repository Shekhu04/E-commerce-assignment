import React from "react";
import { Container, Typography } from "@mui/material";

const Profile = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" color="primary">
        Welcome You are logged in.
      </Typography>
    </Container>
  );
};

export default Profile;
