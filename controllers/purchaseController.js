const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const User = require('../models/User');
const { verifyToken, verifyFirebaseToken } = require('../services/firebaseService');

// Controller for creating a new purchase
const createPurchase = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        // Decode the token and verify it.
        const decodedToken = await verifyFirebaseToken(token);
        const firebaseUserId = decodedToken.uid;

        // Find user in MongoDB using the Firebase UID.
        const user = await User.findOne({ firebaseUid: firebaseUserId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user._id;

        // Validate productId and quantity.
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'productId and quantity are required' });
        }

        // Fetch the product details to get the price.
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Calculate total price.
        const totalPrice = product.price * quantity;

        // Create the purchase.
        const newPurchase = new Purchase({
            userId,
            productId,
            quantity,
            totalPrice, // Now we have a calculated totalPrice.
        });

        // Save the new purchase to the database.
        await newPurchase.save();

        res.status(201).json({ message: 'Purchase created successfully', purchase: newPurchase });
    } catch (error) {
        console.error('Error creating purchase:', error);
        res.status(500).json({ message: 'Error creating purchase', error: error.message });
    }
};

// Controller for getting purchases of a user
const getUserPurchases = async (req, res) => {
    try {const token = req.headers.authorization?.split(' ')[1];

        // Decode the token and verify it.
        const decodedToken = await verifyFirebaseToken(token);
        const firebaseUserId = decodedToken.uid;

        // Find user in MongoDB using the Firebase UID.
        const user = await User.findOne({ firebaseUid: firebaseUserId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = user._id;
        
        const purchases = await Purchase.find({ userId })
            .populate('productId', 'name price photoURL')
            .sort({ purchaseDate: -1 });

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ message: 'Error fetching purchases', error: error.message });
    }
};

module.exports = {
    createPurchase,
    getUserPurchases
};
