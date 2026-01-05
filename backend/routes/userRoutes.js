
const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllerr');
const { protect } = require('../middlewares/authMiddleware');


// Temporary handler to avoid server crash — replace with real controller later
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/profile', protect, updateUserProfile)

module.exports = router;