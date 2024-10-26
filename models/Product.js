// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    specifications: { type: Object, default: {} },
    photoURL: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
