// controllers/productController.js

const Product = require('../models/Product');

// Add a product
const addProduct = async (req, res) => {
    try {
      const { productId, name, price, featured, rating, company } = req.body;
      const userId = req.user._id; // Ensure user ID is set by authentication middleware
  
      const product = new Product({
        productId,
        name,
        price,
        featured,
        rating,
        createdAt: new Date(),
        company,
        user: userId, // Assign user ID to product
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
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
const getProductsByMaxPrice = async (req, res) => {
  try {
    const { price } = req.params;
    const products = await Product.find({ price: { $lt: price } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch products with rating higher than a certain value
const getProductsByMinRating = async (req, res) => {
  try {
    const { rating } = req.params;
    const products = await Product.find({ rating: { $gt: rating } });
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
  getProductsByMaxPrice,
  getProductsByMinRating,
  getUserProducts,
};
