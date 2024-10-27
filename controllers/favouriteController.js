const Favourite = require('../models/Favourite');
const Product = require('../models/Product');
const User = require('../models/User');
const { verifyFirebaseToken } = require('../services/firebaseService');

// Add product to favourites
const addToFavourite = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = await verifyFirebaseToken(token);
        if (!decodedToken || !decodedToken.uid) {
            return res.status(400).json({ message: 'Invalid Firebase token' });
        }

        // Extract the Firebase UID
        const firebaseUserId = decodedToken.uid;
        if (!firebaseUserId) {
            return res.status(400).json({ message: 'Firebase User ID is missing in request' });
        }
        console.log(User, firebaseUserId, token);

        // Find user in MongoDB by their Firebase UID
        const user = await User.findOne({ firebaseUid: firebaseUserId });
        console.log('------------------------------------------');
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { productId } = req.body;
        console.log('------------------------------------------');
        console.log(user,productId);
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Add the product to the favourites
        const newFavouriteItem = new Favourite({
            userId: user._id,
            productId,
        });

        await newFavouriteItem.save();

        res.status(201).json({ message: 'Product added to favourites' });
    } catch (error) {
        console.error('Error adding product to favourites:', error);
        res.status(500).json({ message: 'Error adding product to favourites', error: error.message });
    }
};

// Get all favourite items for a user
const getFavouriteItems = async (req, res) => {
    try {
        const firebaseUserId = req.user?.uid; // uid from Firebase token
        const user = await User.findOne({ firebaseUid: firebaseUserId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favouriteItems = await Favourite.find({ userId: user._id }).populate('productId');
        res.status(200).json(favouriteItems);
    } catch (error) {
        console.error('Error fetching favourite items:', error);
        res.status(500).json({ message: 'Error fetching favourite items', error: error.message });
    }
};

module.exports = { addToFavourite, getFavouriteItems };
