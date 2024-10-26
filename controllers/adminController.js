const { getAllUsers, updateUserRole } = require('../services/adminService');

const listUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const updatedUser = await updateUserRole(req.params.userId, role);
        res.json({ message: 'User role updated', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { listUsers, changeUserRole };
