const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.header('token');

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'shreya313');

        // Add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = {
    authMiddleware
};
