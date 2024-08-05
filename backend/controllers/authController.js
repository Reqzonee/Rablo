// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Signup function
// controllers/authController.js

const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create new user
      const user = await User.create({ name, email, password });
      const token = createToken(user._id);
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Signup error:', error.message);
      res.status(500).json({ error: 'Server error during signup' });
    }
  };
    
// Login function
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate token
      const token = createToken(user._id);
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Server error during login' });
    }
  };

  const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  };
  

  const getUserData = async (req, res) => {
    try {
      // Assuming the user ID is stored in the JWT and you have a User model
      const userId = req.user.id; // req.user should be populated by authentication middleware
      const user = await User.findById(userId).select('name'); // Fetch user with only 'name'
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
module.exports = { signup, login, logout, getUserData};
