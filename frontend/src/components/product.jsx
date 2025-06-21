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
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Product = () => {
  const { isAuthenticated, addToCart } = useAuth();
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();


  // Fetch products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (isAuthenticated && !addedItems.includes(product._id)) {
      addToCart(product);
      setAddedItems((prev) => [...prev, product._id]);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setAddedItems([]);
    }
  }, [isAuthenticated]);

  return (
    <Container sx={{ mt: 4 }}>
      {isAuthenticated && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={product._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 200,
                  overflow: "hidden",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6">{product.name}</Typography>

                {isAuthenticated ? (
                  <Typography variant="body2" color="text.secondary">
                    {product.details}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    Login to view details
                  </Typography>
                )}

                {isAuthenticated && (
                  <Box mt={2}>
                    {product.specs?.map((line, idx) => (
                      <Typography key={idx} variant="body2">
                        {line}
                      </Typography>
                    ))}
                    <Typography variant="body1" fontWeight="bold">
                      Price: ₹{product.price?.toLocaleString()}
                    </Typography>
                  </Box>
                )}

                <Box mt={2}>
                  {isAuthenticated ? (
                    <Button
                      variant={
                        addedItems.includes(product._id)
                          ? "outlined"
                          : "contained"
                      }
                      onClick={() => handleAddToCart(product)}
                      disabled={addedItems.includes(product._id)}
                    >
                      {addedItems.includes(product._id)
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
