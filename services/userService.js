const User = require('../models/User');

const updateUserProfile = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = {
    updateUserProfile,
};
