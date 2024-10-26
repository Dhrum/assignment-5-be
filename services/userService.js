const User = require('../models/User');

// const getUserProfile = async (userId) => {
//     return await User.findById(userId, '-password'); // Exclude password
// };

const updateUserProfile = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    user.name = updateData.name || user.name;
    user.phone = updateData.phone || user.phone;
    user.address = updateData.address || user.address;
    user.profilePicture = updateData.profilePicture || user.profilePicture;

    return await user.save();
};

module.exports = { updateUserProfile };
