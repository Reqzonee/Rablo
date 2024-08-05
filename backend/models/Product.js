// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: mongoose.Schema.Types.Decimal128,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, // Set default to current date
  },
  company: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
