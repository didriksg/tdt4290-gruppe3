const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongodb:27017/journal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // port 27017, use journal
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established success")
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});