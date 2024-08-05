// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Add routes with authentication middleware
router.post('/', authMiddleware, productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/price', productController.getProductsByPrice);
router.get('/rating', productController.getProductsByRating);
router.get('/user', authMiddleware, productController.getUserProducts); // New route for user products
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
