import express from 'express';
import mongoose from 'mongoose';
import {apiPort, mongodbConnectionString, mongodbDatabaseName, mongodbPort} from './config/default';
import cors from 'cors'

import authRouter from './routes/authRouter';
import caseRouter from './routes/caseRouter';
import userRouter from './routes/userRouter';
import { ModuleMap } from 'jest-haste-map';

const rateLimit = require("express-rate-limit");
 
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});
 


const app = express();
app.use(express.json());
app.use(limiter);
app.use(cors());



// Connect to MongoDB via mongoose.
const connectionString = mongodbConnectionString + mongodbPort + '/' + mongodbDatabaseName;

console.log(connectionString)

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully on port: ' + mongodbPort))
    .catch(err => console.log(err));

// Setup routes.
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/case', caseRouter);

// Make app listen a given port
app.listen(apiPort, () => console.log('Server is running on port: ' + apiPort));


module.exports = app;