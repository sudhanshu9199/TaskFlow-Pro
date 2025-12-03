const express = require('express');
const userModel = require('../models/userModel.js');
const { registerUser } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login',)


module.exports = router;