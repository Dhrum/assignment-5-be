const admin = require('firebase-admin');
const serviceAccount = require('../config/glowmart-cb613-firebase-adminsdk-63kpe-34ab8ad2b7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (token) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Unauthorized');
    }
};

module.exports = { verifyToken };
