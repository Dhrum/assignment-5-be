const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/userController');
const { authMiddleware, verifyJwtToken, isAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { getAllUsers } = require('../controllers/adminController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

router.get('/me', verifyJwtToken, getUserProfile);
// Use the middlewares correctly
// router.get('/profile', authMiddleware, getProfile);
// router.put('/profile', authMiddleware, updateProfile);   
router.get('/', verifyJwtToken, isAdmin, getAllUsers);
router.put('/update', verifyJwtToken, upload.single('profileImage'), updateUserProfile);

module.exports = router;
