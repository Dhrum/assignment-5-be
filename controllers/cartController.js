const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { verifyFirebaseToken } = require('../services/firebaseService');

// Add product to cart
const addToCart = async (req, res) => {

    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = await verifyFirebaseToken(token);
        if (!decodedToken || !decodedToken.uid) {
            return res.status(400).json({ message: 'Invalid Firebase token' });
        }
        // Extract the Firebase UID
        const firebaseUserid = decodedToken.uid;
        if (!firebaseUserid) {
            return res.status(400).json({ message: 'Firebase User ID is missing in request' });
        }
        
        // Find user in MongoDB by their Firebase UID
        const user = await User.findOne({ firebaseUid: firebaseUserid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        // Add the product to the cart
        const newCartItem = new Cart({
            userId: user._id,
            productId,
            quantity,
        });

        await newCartItem.save();

        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
    try {
        const firebaseUserId = req.user?.uid; // uid from Firebase token
        const user = await User.findOne({ firebaseUid: firebaseUserId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = await Cart.find({ userId: user._id }).populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
};


module.exports = { addToCart, getCartItems };
