const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate a user.
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, authController.getUser);

module.exports = router;