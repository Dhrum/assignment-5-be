const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    googleId: { type: String }, // For Google OAuth
    profilePicture: { type: String }, // URL for profile picture
    firebaseUid: { type: String, unique: true, required: true }, // Store Firebase UID here
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);