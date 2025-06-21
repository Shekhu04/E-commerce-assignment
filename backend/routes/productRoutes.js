const express = require("express")
const Product = require("../models/Product")
const authenticate = require("../middleware/auth")

const productRouter = express.Router();

// Create a new product (only if logged in)
productRouter.post("/", authenticate, async (req, res) => {
    const { name, image, details, price, specs } = req.body;
  
    if (!name || !details || !price) {
      return res.status(400).json({ message: "Name, details and price are required" });
    }
  
    try {
      const product = await Product.create({
        name,
        image,
        details,
        price,
        specs,
        createdBy: req.user.id,
      });
  
      res.status(201).json(product);
    } catch (err) {
      console.error("Create product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get all products
  productRouter.get("/", async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (err) {
      console.error("Fetch products error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  module.exports = productRouter;