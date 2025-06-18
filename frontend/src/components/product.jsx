import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CardMedia,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useAuth } from "../AuthContext"; // Custom hook to access authentication and cart context

const Product = () => {
  const { isAuthenticated, addToCart, cart } = useAuth(); // Get auth state and cart functions from context
  const [addedItems, setAddedItems] = useState([]); // Track which items are already added to cart

  // Static product data (normally fetched from backend)
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      image: "iphone.jpg",
      details: "Apple A17 Pro, 128GB, Dynamic Island",
      price: 79990,
      specs: [
        "Camera: 48MP Main, 12MP Ultra-Wide",
        "Battery: 20 hours video playback",
        "Display: 6.1″ Super Retina XDR",
      ],
    },
    {
      id: 2,
      name: "MacBook Pro",
      image: "macbook.jpg",
      details: "Apple M2 Pro, 16GB RAM, 512GB SSD",
      price: 199990,
      specs: [
        "Display: 14″ Liquid Retina XDR",
        "Processor: Apple M2 Pro",
        "Battery: Up to 18 hours",
      ],
    },
    {
      id: 3,
      name: "Apple Watch Series 9",
      image: "watch.jpg",
      details: "41mm Midnight Aluminum Case with Sport Band",
      price: 41990,
      specs: [
        "Display: Always-On Retina",
        "Battery: 18 hours",
        "Sensors: Blood Oxygen, ECG, Heart Rate",
      ],
    },
    {
      id: 4,
      name: "AirPods Pro (2nd Gen)",
      image: "airpods.jpg",
      details: "Active Noise Cancellation, MagSafe Charging Case",
      price: 26990,
      specs: [
        "Audio: Adaptive Transparency",
        "Battery: 6 hours (buds) + 30 hours (case)",
        "Chip: Apple H2",
      ],
    },
  ];

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // If user is authenticated and product not already added
    if (isAuthenticated && !addedItems.includes(product.id)) {
      addToCart(product); // Add to global cart state
      setAddedItems((prev) => [...prev, product.id]); // Mark as added
    }
  };

  // Clear addedItems list if user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setAddedItems([]);
    }
  }, [isAuthenticated]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
            <Card sx={{ height: "100%" }}>
              {/* Product Image */}
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 250, objectFit: "cover" }}
              />

              <CardContent>
                {/* Product Name */}
                <Typography variant="h6">{product.name}</Typography>

                {/* Product Details - only visible to authenticated users */}
                {isAuthenticated ? (
                  <Typography variant="body2" color="text.secondary">
                    {product.details}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    Login to view details
                  </Typography>
                )}

                {/* Specs and price - only visible to authenticated users */}
                {isAuthenticated && (
                  <Box mt={2}>
                    {product.specs.map((line, idx) => (
                      <Typography key={idx} variant="body2">
                        {line}
                      </Typography>
                    ))}
                    <Typography variant="body1" fontWeight="bold">
                      Price: ₹{product.price.toLocaleString()}
                    </Typography>
                  </Box>
                )}

                {/* Add to cart or message */}
                <Box mt={2}>
                  {isAuthenticated ? (
                    <Button
                      variant={
                        addedItems.includes(product.id)
                          ? "outlined"
                          : "contained"
                      }
                      onClick={() => handleAddToCart(product)}
                      disabled={addedItems.includes(product.id)}
                    >
                      {addedItems.includes(product.id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </Button>
                  ) : (
                    <Typography color="error">
                      Login to view & add to cart
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product;
