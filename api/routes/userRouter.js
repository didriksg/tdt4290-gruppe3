import express from 'express';
import {register} from '../controllers/userController';

const userRouter = express.Router();

// @route   POST api/user/register
// @desc    Register new user
// @access  Public
userRouter.post('/register', register);


export default userRouter;