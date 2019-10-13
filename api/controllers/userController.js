import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {bcryptSaltRounds, jwtExpireInterval, jwtSecret} from '../config/default';

// User model
import User from '../models/User';


/**
 * Register a new user.
 */
export const register = function registerNewUser(req, res) {
    const name  = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check that all required data is provided.
    if (name === undefined
        || name === ''
        || email === undefined
        || email === ''
        || password === undefined
        || password === '') {
        res.status(400)
            .json({msg: 'Please enter all fields'});
        return;
    }

    // Check for existing user
    User.findOne({email})
        .then((user) => {
            if (user !== null) {
                res.status(400)
                    .json({msg: 'User already exists'});
                return;
            }

            // If no user with this email exist, create new user model with given data.
            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt and hash password
            bcrypt.genSalt(bcryptSaltRounds)
                .then((salt) => {
                    bcrypt.hash(newUser.password, salt)
                        .then((hash) => {
                            // Save new user and assign a token.
                            newUser.password = hash;
                            newUser.save()
                                .then((user) => {
                                    jwt.sign(
                                        {id: user.id},
                                        jwtSecret,
                                        {expiresIn: jwtExpireInterval},
                                        (err, token) => {
                                            if (err)
                                                throw err;

                                            res.status(200)
                                                .json({
                                                    token,
                                                    user: {
                                                        id: user.id,
                                                        name: user.name,
                                                        email: user.email,
                                                    }
                                                })
                                        });
                                });
                        })
                        .catch((err) => {
                            throw err;
                        });
                })
                .catch(() => {
                    res.status(500)
                        .json({msg: 'Problems hashing password.'});
                });
        })
};
