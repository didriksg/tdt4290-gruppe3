const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// @route   POST api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', userController.register);


module.exports = router;