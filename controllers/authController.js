const { registerUser, loginUser, googleLogin } = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
    googleSignIn,
};
