const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


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
                    console.log(newUser.password);
                    // Throw the error further up if a problem occurs with hashing.
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    console.log(newUser.password);
                });

                // Save new user
                newUser.save()
                    .then(user => {
                        res.json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            }
                        })
                    })
            });
        });
});


module.exports = router;