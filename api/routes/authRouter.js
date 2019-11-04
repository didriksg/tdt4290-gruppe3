import express from 'express';
import auth from '../middleware/auth';
import {getUser, login} from '../controllers/authController';

const authRouter = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate a user.
// @access  Public
authRouter.post('/login', login);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
authRouter.get('/user', auth, getUser);

export default authRouter;