const { registerUser, loginUser, googleLogin } = require('../services/authService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { verifyToken, verifyFirebaseToken } = require('../services/firebaseService');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('token',req.headers);
        // Verify Firebase token to get the UID
        const token = req.headers.authorization?.split(' ')[1];
        console.log('token',token);
        const decodedToken = await verifyFirebaseToken(token);
        console.log('decodedtoken',decodedToken);

        if (!decodedToken || !decodedToken.uid) {
            return res.status(400).json({ message: 'Invalid Firebase token' });
        }

        // Extract the Firebase UID
        const firebaseUid = decodedToken.uid;
        console.log(firebaseUid);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            firebaseUid
        });
        console.log(user);
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const googleSignIn = async (req, res) => {
    try {
        const { googleId, email, name, profilePicture } = req.body;
        const { user, token } = await googleLogin({ googleId, email, name, profilePicture });
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    googleSignIn
};
