const User = require('../models/User');

const getAllUsers = async () => {
    return await User.find();
};

const updateUserRole = async (userId, role) => {
    return await User.findByIdAndUpdate(userId, { role }, { new: true });
};

module.exports = { getAllUsers, updateUserRole };
