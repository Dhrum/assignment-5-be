const express = require('express');
const { login, register, googleSignIn } = require('../controllers/authController');

const cors = require('cors');
const connectDB = require('../config/db');

//const authRoutes = require('./routes/authRoutes');
// ... other imports

const router = express.Router();
router.post('/google-signin', googleSignIn);
router.post('/register', register);
router.post('/login', login);


 const app = express();
// const PORT = process.env.PORT || 5000;


// require('dotenv').config();
// connectDB();

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'https://glow-mart.surge.sh', credentials: true }));
app.use(express.json());

//app.use('/api/auth', authRoutes); // This line should include authRoutes


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = router;