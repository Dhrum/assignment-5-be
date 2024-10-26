const Purchase = require('../models/Purchase');

const createPurchase = async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body);
        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (error) {
        res.status(500).json({ message: 'Error creating purchase', error: error.message });
    }
};

const updatePurchase = async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(updatedPurchase);
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchase', error: error.message });
    }
};

const deletePurchase = async (req, res) => {
    try {
        const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
        if (!deletedPurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json({ message: 'Purchase deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting purchase', error: error.message });
    }
};

const getPurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id);
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching purchase', error: error.message });
    }
};

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching purchases', error: error.message });
    }
};

module.exports = {
    createPurchase,
    updatePurchase,
    deletePurchase,
    getPurchase,
    getAllPurchases,
};
