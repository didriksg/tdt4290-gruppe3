const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/default');

const User = require('../models/User');

/**
 * Logs a user in by checking the DB for a matching user, validating the password, and returning a JWT.
 */
exports.login = function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Simple validation
    if (email === undefined
        || email === ''
        || password === undefined
        || password === '') {
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
};

/**
 * Get the all data about the current user, except the password.
 */
exports.getUser = function getUserById(req, res) {
    User.findById(req.user.id)
        .select('-password')
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json({msg: 'User data not found..'}));
};