// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login,logout,getUserData } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout); 
router.get('/user', authMiddleware, getUserData); 

module.exports = router;
