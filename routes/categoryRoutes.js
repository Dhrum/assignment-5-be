const express = require('express');
const { createCategory, listCategories, editCategory, removeCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', listCategories);
router.post('/', authMiddleware, adminMiddleware, createCategory);
router.put('/:categoryId', authMiddleware, adminMiddleware, editCategory);
router.delete('/:categoryId', authMiddleware, adminMiddleware, removeCategory);

module.exports = router;
