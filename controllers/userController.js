const { updateProfile } = require('../services/userService');
const User = require('../models/User');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const firebaseUserId = req.user?.uid; // uid from Firebase token
       

        if (!firebaseUserId) {
            return res.status(400).json({ message: 'Firebase User ID is missing in request' });
        }
       
        // Find user in MongoDB by their Firebase UID
        const user = await User.findOne({ firebaseUid: firebaseUserId }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the MongoDB `_id` from the found user
        const userId = user._id;

        const { name, email, phone, address } = req.body;
        const updateData = { name, email, phone, address };

        // Handle profile image update if provided
        if (req.file) {
            updateData.profileImage = req.file.path; // Assuming multer saves the file
        }

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

module.exports = { getUserProfile, updateUserProfile };
