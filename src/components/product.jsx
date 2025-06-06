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
import { useAuth } from "../AuthContext";

const Product = () => {
  const { isAuthenticated, addToCart, cart } = useAuth();
  const [addedItems, setAddedItems] = useState([]);

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

  const handleAddToCart = (product) => {
    if (isAuthenticated && !addedItems.includes(product.id)) {
      addToCart(product);
      setAddedItems((prev) => [...prev, product.id]);
    }
  };

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
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 250, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.details}
                </Typography>

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
