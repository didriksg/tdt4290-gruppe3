const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

app.use(express.json());

// Connect to MongoDB via mongoose.
mongoose
    .connect('mongodb://mongodb:27017/journal', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));

// Setup routes.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registerUser', require('./routes/users'));

// Make app listen a given port
const PORT = config.get('apiPort');
app.listen(PORT, () => console.log("Server is running on port: " + PORT));
