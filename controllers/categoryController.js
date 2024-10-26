const { addCategory, getAllCategories, updateCategory, deleteCategory } = require('../services/categoryService');

const createCategory = async (req, res) => {
    try {
        const category = await addCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editCategory = async (req, res) => {
    try {
        const updatedCategory = await updateCategory(req.params.categoryId, req.body);
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeCategory = async (req, res) => {
    try {
        await deleteCategory(req.params.categoryId);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createCategory, listCategories, editCategory, removeCategory };
