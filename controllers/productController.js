const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../services/productService');

const createProduct = async (req, res) => {
    try {
        const product = await addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const productDetails = async (req, res) => {
    try {
        const product = await getProductById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.productId, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await deleteProduct(req.params.productId);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createProduct, listProducts, productDetails, editProduct, removeProduct };
