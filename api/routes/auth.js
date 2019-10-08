const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/default');

const router = express.Router();

const User = require('../models/User');
const auth = require('../middleware/auth');


// @route   POST api/auth/login
// @desc    Authenticate a user.
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Simple validation
    if (email === undefined || password === undefined) {
        return res.status(400)
            .json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400)
                    .json({msg: 'User does not exist.'});
            }

            // Validate password against hashed password in database.
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400)
                            .json({msg: 'Invalid user name or password.'})
                    }

                    // If successful match, sign a token and return it.
                    jwt.sign(
                        {id: user.id},
                        config['jwtSecret'],
                        {expiresIn: config['jwtExpireInterval']},
                        (err, token) => {
                            if (err) throw err;

                            // Respond with the token and credentials.
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                }
                            });
                        }
                    );
                });
        });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json({msg: 'User data not found..'}));
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user/:id', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;