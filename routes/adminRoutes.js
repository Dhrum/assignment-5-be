const express = require('express');
const { getAllUsers, getUserById, deleteUser } = require('../controllers/adminController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all users (Admin only)
router.get('/users', authMiddleware, isAdmin, getAllUsers);

// Get user by ID (Admin only)
router.get('/users/:id', authMiddleware, isAdmin, getUserById);

// Delete user (Admin only)
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);

module.exports = router;
