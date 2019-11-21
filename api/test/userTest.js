

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');


var token; 
var id;
var test_username = "abc"
var test_email = "abc@cba.no"
var test_password = "passord"

describe('Creating and logging in user works', () => {

    
    it('Creating a new user works', (done) => {

        request(app).post('/api/user/register').send({
            name: test_username,
            email: test_email,
            password: test_password
        })
        .then((res) => {
            token = res.body.token;
            id = res.body.user.id;
            const body = res.body;
            expect(body).to.contain.property('token');
            expect(body).to.contain.property('user');
            done();
        })
        .catch((err) => done(err));

    });



    it('Fails, request requires all fields ', (done) => {


        request(app).post('/api/user/register').send({
            password: test_password
        })
        .then((res) => {
            console.log("REGISTER MISSING FIELDS RESPONSE::::", res.body)
            expect(res.body.msg).to.equal('Please enter all fields');
            done();
        })
        .catch((err) => done(err));

    })

    it('Logs in user ', (done) => {

        request(app).post('/api/auth/login').send({
            email: test_email,
            password: test_password
        })
        .then((res) => {
            expect(res.body).to.contain.property('token');
            expect(res.body).to.contain.property('user');
            done();
        })
        .catch((err) => done(err));

    })


})


describe('Case routes tests', () => {

    it('OK, creating a new case works', (done) => {

        request(app).post('/api/case/add').set('x-auth-token', token).send({
            idNumber: "12345",
            priority: 4,
            isChildrenCase: true,
            startupDate: Date.now(),
            registeredDate: Date.now(),
            category: "test category",
            district: "test district",
            description: "text description",
            referredFrom: "test referreral",
            important: true
        })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
        })
        .catch((err) => done(err));

    });

});
