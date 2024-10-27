const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Favourite', FavouriteSchema);
