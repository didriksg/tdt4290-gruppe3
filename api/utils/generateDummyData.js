const mongoose = require('mongoose');
const mockReqRes = require('mock-req-res');
const bcrypt = require('bcryptjs');

const config = require('../config/default');
const users = require('../dummy_data/dummyUsers');
const categories = require('../config/acceptedCategories');

const User = require('../models/User');
const Case = require('../models/Case');

const availableDistricts = ['Midtbyen', 'Lerkendal', 'Østbyen', 'Heimdal'];
const numberOfCasesToGenerate = 3;


const genDbData = function generateDummyDataToDatabase() {
    const mongodbPort = config['mongodbPort'];
    const mongodbConnectionString = config['mongodbConnectionString'];
    const mongodbDatabaseName = config['mongodbDatabaseName'];

    const connectionString = mongodbConnectionString + mongodbPort + '/' + mongodbDatabaseName;

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(async () => {
            await genCases();
            await genUsers(users);
        })
        .finally(() => mongoose.disconnect())
        .catch(err => console.log(err));
};

const genCases = async function generateDummyCases(cases) {
    const availableCategories = categories['categories'];

    for (i = 0; i < numberOfCasesToGenerate; i++) {
        const gericaNumber = Math.floor(Math.random() * 999999) + 100000;
        const priority = Math.floor(Math.random() * 4) + 1;
        const isChildrenCase = Math.random() >= 0.7;

        const registerYear = 2019;
        const registeredMonth = Math.floor(Math.random() * 11) + 1;
        const registeredDay = Math.floor(Math.random() * 27) + 1;

        let startYear = registerYear;
        let startMonth = registeredMonth + Math.floor(Math.random() * 3);
        let startDay = registeredDay + Math.floor(Math.random() * 27) + 1;

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
    }
    console.log(numberOfCasesToGenerate.toString() + ' new cases added to the database.')
};

const genUsers = async function generateDummyUsers(users) {
    const us = users['users'];

    for (i = 0; i < us.length; i++) {
        const name = us[i].name;
        const email = us[i].email;
        const password = us[i].password;


        // Check for existing user
        User.findOne({email})
            .then((user) => {
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
                        throw err;
                    })
            })

            .catch((err) => {
                throw err;
            });
    }
};
genDbData();


