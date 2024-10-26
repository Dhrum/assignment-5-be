const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require('../controllers/productController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to create a product (only admin)
router.post('/', authMiddleware, isAdmin, createProduct);

// Route to update a product (only admin)
router.put('/:id', authMiddleware, isAdmin, updateProduct);

// Route to delete a product (only admin)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

// Route to get a single product (accessible to all)
router.get('/:id', getProductById);

// Route to get all products (accessible to all)
router.get('/', getAllProducts);

module.exports = router;
