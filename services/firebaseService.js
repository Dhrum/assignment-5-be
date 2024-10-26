const admin = require('firebase-admin');
const serviceAccount = require('../config/glowmart-cb613-firebase-adminsdk-63kpe-34ab8ad2b7.json');
const { getAuth } = require('firebase-admin/auth');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


const verifyFirebaseToken = async (token) => {
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid Firebase token');
    }
};

module.exports = { verifyToken, verifyFirebaseToken };
