import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

const Product = ({ isAuthenticated }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewMore = () => {
    if (isAuthenticated) {
      setShowDetails(true);
    }
  };


  useEffect(() => {
    if (!isAuthenticated) {
      setShowDetails(false);
    }
  }, [isAuthenticated]);

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 500, margin: "auto" }}>
        <CardMedia
          component="img"
          image="iphone.jpg"
          alt="iPhone 15"
          sx={{
            height: { xs: 250, sm: 300 },
            objectFit: "cover",
            width: "100%",
          }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            iPhone 15
          </Typography>
          <Typography color="text.secondary">
            Apple A17 Pro, 128GB, Dynamic Island
          </Typography>

          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              onClick={handleViewMore}
              disabled={!isAuthenticated}
            >
              {isAuthenticated ? "View More" : "Login to View More"}
            </Button>
          </Box>

          {showDetails && (
            <Box mt={2}>
              <Typography variant="body1">
                <strong>Camera:</strong> 48MP Main, 12MP Ultra-Wide
              </Typography>
              <Typography variant="body1">
                <strong>Battery:</strong> 20 hours video playback
              </Typography>
              <Typography variant="body1">
                <strong>Display:</strong> 6.1″ Super Retina XDR
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ₹79,990
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Product;
