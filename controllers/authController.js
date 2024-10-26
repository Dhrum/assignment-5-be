const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const user = new User({ name, email, phone, address });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details' });
    }
};

module.exports = { registerUser, getUserDetails };
