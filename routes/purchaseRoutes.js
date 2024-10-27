const express = require('express');
const { createPurchase, getUserPurchases } = require('../controllers/purchaseController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for creating a new purchase (POST request)
router.post('/buy', authMiddleware, createPurchase);

// Route for getting user's purchases (GET request)
router.get('/me', authMiddleware, getUserPurchases);

module.exports = router;
