const { createPurchase, getUserPurchases } = require('../services/purchaseService');

const logPurchase = async (req, res) => {
    try {
        const userId = req.user.id;
        const purchase = await createPurchase(userId, req.body);
        res.status(201).json({ message: 'Purchase successful', purchase });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listUserPurchases = async (req, res) => {
    try {
        const userId = req.user.id;
        const purchases = await getUserPurchases(userId);
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { logPurchase, listUserPurchases };
