import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useAuth } from "../AuthContext";

const Cart = () => {
  // Access cart items and clearCart function from AuthContext
  const { cart, clearCart } = useAuth();

  // Calculate total price from all cart items
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Handler for checkout button
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty."); // Guard clause
    alert("Checkout successful!"); // Show success alert
    clearCart(); // Clear cart after checkout
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Page Heading */}
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>

      {/* If cart is empty, show message */}
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {/* List of cart items */}
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: ₹${item.price}`}
                />
              </ListItem>
            ))}
          </List>

          {/* Divider between list and total */}
          <Divider sx={{ my: 2 }} />

          {/* Total Price */}
          <Typography variant="h6">Total: ₹{totalPrice}</Typography>

          {/* Checkout Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
