const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');

// User model
const User = require('../models/User');

// @route   POST api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    // Check that all required data is provided.
    if (name === undefined || email === undefined || password === undefined) {
        return res.status(400)
            .json({msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({email})
        .then((user) => {
            if (user !== undefined) {
                return res.status(400)
                    .json({msg: 'User already exists'});
            }

            // If no user with this email exist, create new user model with given data.
            const newUser = new User({
                name,
                email,
                password
            });


            // Create salt and hash password
            bcrypt.genSalt(10)
                .then((salt) => {
                    bcrypt.hash(newUser.password, salt)
                        .then((hash) => {
                            // Save new user and assign a token.
                            newUser.password = hash;
                            newUser.save()
                                .then((user) => {
                                    jwt.sign(
                                        {id: user.id},
                                        config.get('jwtSecret'),
                                        {expiresIn: config.get('jwtExpireInterval')},
                                        (err, token) => {
                                            if (err) throw err;

                                            res.status(200)
                                                .json({
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
                        })
                        .catch((err) => {
                            throw err;
                        });
                })
                .catch(() => {
                    res.status(500)
                        .json({msg: 'Problems hashing password.'});
                });
        });
});


module.exports = router;