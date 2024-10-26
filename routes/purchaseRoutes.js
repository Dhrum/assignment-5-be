const express = require('express');
const { createPurchase, updatePurchase, deletePurchase, getPurchase, getAllPurchases } = require('../controllers/purchaseController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new purchase
router.post('/', authMiddleware, createPurchase);

// Update a purchase
router.put('/:id', authMiddleware, updatePurchase);

// Delete a purchase
router.delete('/:id', authMiddleware, isAdmin, deletePurchase);

// Get a single purchase
router.get('/:id', authMiddleware, getPurchase);

// Get all purchases (admin only)
router.get('/', authMiddleware, isAdmin, getAllPurchases);

module.exports = router;
