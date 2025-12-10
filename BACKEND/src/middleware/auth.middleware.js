const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.AuthToken;
        if(!token) return res.status(401).json({ message: "Authentication required" });
        let payload;

        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch(err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await userModel.findById(payload.id).select('-password');
        if(!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            message: 'Server error in auth middleware'
        })
    }
}

module.exports = authMiddleware;