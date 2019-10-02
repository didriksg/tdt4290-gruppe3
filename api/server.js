const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://mongodb:27017/journal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); // port 27017, use journal
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established success")
});

// Use routes
app.use('/api/user', require('./routes/users'));
app.use('/api/auth', require('./routes/authentication'));


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});