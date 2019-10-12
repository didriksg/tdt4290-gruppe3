const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Dummy data users.
const users = require('../dummy_data/dummyUsers');

// Categories and config files
const config = require('../config/default');
const categories = require('../config/acceptedCategories');

// Models
const User = require('../models/User');
const Case = require('../models/Case');

const availableDistricts = ['Midtbyen', 'Lerkendal', 'Østbyen', 'Heimdal'];
const numberOfCasesToGenerate = 5;


const genDbData = function generateDummyDataToDatabase() {
    const mongodbPort = config['mongodbPort'];
    const mongodbConnectionString = config['mongodbConnectionString'];
    const mongodbDatabaseName = config['mongodbDatabaseName'];

    const connectionString = mongodbConnectionString + mongodbPort + '/' + mongodbDatabaseName;

    // Create a new connection to the DB.
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(async () => {
            // Await for the users and cases to be generated and saved.
            console.log('Generating users..');
            await genUsers(users);
            console.log('Generating cases..');
            await genCases();
        })
        .finally(async () => {
            console.log('Closing connection...');
            await mongoose.disconnect()
                .then(() => console.log('Connection closed.'))
        })
        .catch(err => console.log(err));
};

const genCases = async function generateDummyCases() {
    const availableCategories = categories['categories'];

    for (let i = 0; i < numberOfCasesToGenerate; i++) {
        const gericaNumber = randomInt(100000, 999999);
        const priority = randomInt(1, 4);
        const isChildrenCase = Math.random() >= 0.7;

        const registerYear = 2019;
        const registeredMonth = randomInt(1, 12);
        const registeredDay = randomInt(1, 27);

        let startYear = registerYear;
        let startMonth = registeredMonth + randomInt(0, 3);
        let startDay = registeredDay + randomInt(1, 28);

        if (startDay > 28) {
            startMonth++;
            startDay = startDay % 28;
        }

        if (startMonth > 12) {
            startYear++;
            startMonth = startMonth % 12;
        }


        const description = "En kul beskrivelse.";
        const startupDate = new Date(startYear, startMonth, startDay);
        const registeredDate = new Date(registerYear, registeredMonth, registeredDay);
        const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const district = availableDistricts[Math.floor(Math.random() * availableDistricts.length)];
        const important = Math.random() >= 0.9;

        const newCase = new Case({
            gericaNumber,
            priority,
            isChildrenCase,
            startupDate,
            registeredDate,
            category,
            district,
            'important': important,
            'description': description,
        });

        await newCase.save();

        const progress = ((i + 1) / numberOfCasesToGenerate) * 100;
        process.stdout.write("Adding new cases to database...    Progress " + progress.toFixed(2) + "% \r");
    }
    console.log('\n'+numberOfCasesToGenerate.toString(), 'new cases added to the database.\n')
};

const genUsers = async function generateDummyUsers(users) {
    const us = users['users'];
    let usersAdded = 0;
    for (i = 0; i < us.length; i++) {
        const name = us[i].name;
        const email = us[i].email;
        const password = us[i].password;


        // Check for existing user
        const user = await User.findOne({email});
        if (user !== null) {
            continue;
        }

        // If no user with this email exist, create new user model with given data.
        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt and hash password
        bcrypt.genSalt(config['bcryptSaltRounds'])
            .then((salt) => {
                bcrypt.hash(newUser.password, salt)
                    .then(async (hash) => {
                        // Save new user and assign a token.
                        newUser.password = hash;
                        await newUser.save()
                    });
            })
            .catch(() => {
                console.log('Problems hashing password.');
            });

        usersAdded++;
    }

    console.log(usersAdded.toString(), 'new users added.\n');
};

const randomInt = function randomNumberBetweenRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

genDbData();
