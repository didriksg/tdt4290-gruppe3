const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/default');

const app = express();
app.use(express.json());

// Connect to MongoDB via mongoose.

const mongodbPort = config['mongodbPort'];
const mongodbConnectionString = config['mongodbConnectionString'];
const mongodbDatabaseName = config['mongodbDatabaseName'];

const connectionString = mongodbConnectionString + mongodbPort + '/' + mongodbDatabaseName;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully on port: ' + mongodbPort))
    .catch(err => console.log(err));

// Setup routes.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/case', require('./routes/case'));

// Make app listen a given port

const apiPort = config['apiPort'];
app.listen(apiPort, () => console.log('Server is running on port: ' + apiPort));
