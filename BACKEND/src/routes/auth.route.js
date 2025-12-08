const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js')
const { registerUser, loginUser } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    res.clearCookie('AuthToken');
    res.json({ message: 'Logged out successfully' });
})

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;