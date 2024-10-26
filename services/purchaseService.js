const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

const createPurchase = async (userId, purchaseData) => {
    const { productId, quantity } = purchaseData;

    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const totalPrice = product.price * quantity;

    const purchase = new Purchase({
        user: userId,
        product: productId,
        quantity,
        totalPrice,
    });

    await purchase.save();
    return purchase;
};

const getUserPurchases = async (userId) => {
    return await Purchase.find({ user: userId }).populate('product');
};

module.exports = { createPurchase, getUserPurchases };
