import express from 'express';
const userRouter = express.Router();

import {register} from '../controllers/userController';

// @route   POST api/user/register
// @desc    Register new user
// @access  Public
userRouter.post('/register', register);


export default userRouter;