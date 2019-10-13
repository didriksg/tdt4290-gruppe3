import express from 'express';
const authRouter = express.Router();

import auth from '../middleware/auth';
import {login, getUser} from '../controllers/authController';

// @route   POST api/auth/login
// @desc    Authenticate a user.
// @access  Public
authRouter.post('/login', login);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
authRouter.get('/user', auth, getUser);

export default authRouter;