const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');

// User model
const User = require('../models/User');

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.get('/', (req, res) => {
    const {name, email, password} = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400)
            .json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            if (user) {
                return res.status(400)
                    .json({msg: 'User already exists'});
            }

            // Create new user model with given data.
            const newUser = new User({
                name,
                email,
                password
            });


            // Create salt and hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Throw the error further up if a problem occurs with hashing.
                    if (err) throw err;

                    // Save new user and assign a token.
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                {id: user.id},
                                config.get('jwtSecret'),
                                {expiresIn: config.get('jwtExpireInterval')},
                                (err, token) => {
                                    if (err) throw err;

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                        }
                                    })
                                }
                            );
                        })
                });
            });
        });
});


module.exports = router;