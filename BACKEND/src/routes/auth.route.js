const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js')
const { registerUser, loginUser, updateUser, deleteUser } = require('../controller/auth.controller.js');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    res.clearCookie('AuthToken');
    res.json({ message: 'Logged out successfully' });
})

router.put('/update', authMiddleware, upload.single('profileImage'), updateUser);
router.delete('/delete', authMiddleware, deleteUser);

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;