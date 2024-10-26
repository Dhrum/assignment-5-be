const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategories } = require('../controllers/categoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new category (only admin)
router.post('/', authMiddleware, isAdmin, createCategory);

// Update a category (only admin)
router.put('/:id', authMiddleware, isAdmin, updateCategory);

// Delete a category (only admin)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);

// Get a single category (accessible to all)
router.get('/:id', getCategory);

// Get all categories (accessible to all)
router.get('/', getAllCategories);

module.exports = router;
