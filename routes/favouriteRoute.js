const express = require('express');
const { addToFavourite, getFavouriteItems } = require('../controllers/favouriteController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addToFavourite);
router.get('/', authMiddleware, getFavouriteItems);
router.get('/user', authMiddleware, getFavouriteItems);

module.exports = router;
