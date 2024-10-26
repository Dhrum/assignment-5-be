const Product = require('../models/Product');

const addProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};

const getAllProducts = async () => {
    return await Product.find().populate('category');
};

const getProductById = async (id) => {
    return await Product.findById(id).populate('category');
};

const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
