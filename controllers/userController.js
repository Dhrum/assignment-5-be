const { updateUserProfile } = require('../services/userService');

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes user is authenticated
        const updatedUser = await updateUserProfile(userId, req.body);
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    updateProfile,
};
