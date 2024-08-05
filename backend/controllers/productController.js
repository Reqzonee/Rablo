// controllers/productController.js

const Product = require('../models/Product');

// Add a product
const addProduct = async (req, res) => {
    try {
      const {name, price, featured, rating, company } = req.body;
      const userId = req.user._id;
      const productId = new Date().getTime().toString();
  
      // Check if product with the same ID already exists
      const existingProduct = await Product.findOne({ productId });
  
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with this ID already exists' });
      }
  
      const product = new Product({
        productId,
        name,
        price,
        featured,
        rating,
        createdAt: new Date(),
        company,
        user: userId,
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(400).json({ message: error.message });
    }
  };
    
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
    
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch products with price less than a certain value
// src/controllers/productController.js
const getProductsByPrice = async (req, res) => {
    try {
      const maxPrice = parseFloat(req.query.max); // Use req.query for query parameters
  
      // Validate price
      if (isNaN(maxPrice)) {
        return res.status(400).json({ message: 'Invalid price parameter' });
      }
  
      const products = await Product.find({ price: { $lte: maxPrice } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
    
  
// Fetch products with rating higher than a certain value
const getProductsByRating = async (req, res) => {
    try {
      // Extract the minimum rating from query parameters
      const minRating = parseFloat(req.query.min);
  
      // Validate the minRating
      if (isNaN(minRating)) {
        return res.status(400).json({ message: 'Invalid rating parameter' });
      }
  
      // Find products with rating higher than or equal to minRating
      const products = await Product.find({ rating: { $gte: minRating } });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
    

// Get products for the logged-in user
const getUserProducts = async (req, res) => {
    try {
      const userId = req.user._id; // Ensure user ID is available
  
      const products = await Product.find({ user: userId });
      console.log("products are ", products);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByPrice,
  getProductsByRating,
  getUserProducts,
};
