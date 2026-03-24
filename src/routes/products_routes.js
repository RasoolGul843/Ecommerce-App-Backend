const express = require("express");
const router = express.Router();
const ProductController = require('../controller/product_controller');

// Create product
router.post('/', ProductController.createProduct);

// Fetch all products
router.get('/', ProductController.fetchAllProduct);

// Fetch products by category
router.get('/category/:id', ProductController.fetchProductByCategory);

module.exports = router;