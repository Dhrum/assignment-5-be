const express = require('express');
const { listUsers, changeUserRole } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, listUsers);
router.put('/users/:userId/role', authMiddleware, adminMiddleware, changeUserRole);

module.exports = router;
