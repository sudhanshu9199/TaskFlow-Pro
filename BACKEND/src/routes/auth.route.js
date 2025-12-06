const express = require('express');
const userModel = require('../models/userModel.js');
const { registerUser, loginUser } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    res.clearCookie('AuthToken');
    res.json({ message: 'Logged out successfully' });
})

module.exports = router;