// Import necessary modules
const { verifyToken: verifyFirebaseToken } = require('../services/firebaseService');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const admin = require('firebase-admin');
const path = require('path');

// Middleware to verify Firebase token
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add the decoded token info to the request object
        
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

// Middleware to verify custom JWT token
const verifyJwtToken = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add the decoded token info to the request object
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user && user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Admin access required' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error checking admin role' });
    }
};

// Export the middlewares
module.exports = { authMiddleware, verifyJwtToken, isAdmin };
