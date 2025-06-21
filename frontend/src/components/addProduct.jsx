import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    details: "",
    price: "",
    specs: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const specsArray = form.specs.split(",").map((s) => s.trim());

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...form,
          price: Number(form.price),
          specs: specsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added successfully!");
      setForm({ name: "", image: "", details: "", price: "", specs: "" });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Add New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Image URL or Filename"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Details"
            name="details"
            value={form.details}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Price (INR)"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Specifications (comma-separated)"
            name="specs"
            value={form.specs}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            Add Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct;
