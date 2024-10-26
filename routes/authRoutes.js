const express = require('express');
const { registerUser, getUserDetails } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/me', authMiddleware, getUserDetails);

module.exports = router;
