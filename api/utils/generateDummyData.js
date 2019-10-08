const cases = require('../dummy data/dummyCases');
const users = require('../dummy data/dummyUsers');
const categories = require('../config/acceptedCategories');

const Case = require('../models/Case');
const User = require('../models/User');


const genDbData = function generateDummyDataToDatabase() {
    genUsers(users);
    genCases(cases);
};

const genUsers = function generateDummyUsers(users) {
    const userArray = users['users'];

    userArray.forEach((u) => {
        const user = User(
            u.name,
            u.email,
            u.password,
        );

    })
};

const genCases = function generateDummyCases(cases) {

};
