const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes//cartRoutes');
const favouriteRoutes = require('./routes/favouriteRoute');


const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
connectDB();

// Enable CORS
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // Allow cookies and headers to be sent
// }));

app.use(cors({
    origin: 'https://glow-mart.surge.sh', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies and headers to be sent
}));

// Set headers for Cross-Origin policies
app.use((req, res, next) => {
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000,
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((error) => console.error('Error connecting to MongoDB:', error));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favourites', favouriteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
