const express = require('express');
const { logPurchase, listUserPurchases } = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, logPurchase);
router.get('/', authMiddleware, listUserPurchases);

module.exports = router;
