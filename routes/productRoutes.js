const express = require('express');
const { createProduct, listProducts, productDetails, editProduct, removeProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', listProducts);
router.get('/:productId', productDetails);
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:productId', authMiddleware, adminMiddleware, editProduct);
router.delete('/:productId', authMiddleware, adminMiddleware, removeProduct);

module.exports = router;
