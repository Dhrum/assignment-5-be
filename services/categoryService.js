const Category = require('../models/Category');

const addCategory = async (categoryData) => {
    const category = new Category(categoryData);
    await category.save();
    return category;
};

const getAllCategories = async () => {
    return await Category.find();
};

const updateCategory = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = { addCategory, getAllCategories, updateCategory, deleteCategory };
