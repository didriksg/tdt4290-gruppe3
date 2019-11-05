const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');


var token; 
var test_username = "abcccdddde"
var test_email = "abc@cbbbdbba.no"
var test_password = "pass"

describe('POST user/register', () => {


    it('Fail, request requires all fields ', (done) => {

        console.log("2")

        request(app).post('/api/user/register').send({
            password: test_password
        })
        .then((res) => {
            expect(res.body.msg).to.equal('Please enter all fields');
            done();
        })
        .catch((err) => done(err));

    })

    it('Ok, logging in user works ', (done) => {

        console.log("3")

        request(app).post('/api/auth/login').send({
            email: test_email,
            password: test_password
        })
        .then((res) => {
            console.log("BODY LOGIN::: ", res.body)
            expect(res.body).to.contain.property('token');
            expect(res.body).to.contain.property('user');
            done();
        })
        .catch((err) => done(err));

    })

    it('Ok, fetching user works ', (done) => {

        console.log("4")

        request(app).post('/api/auth/login').send({
            password: "Missing fields"
        })
        .then((res) => {
            expect(res.body.msg).to.equal('Please enter all fields');
            done();
        })
        .catch((err) => done(err));

    })


    before(() => {
        console.log("1")

        it('OK, creating a new user works', (done) => {

            request(app).post('/api/user/register').send({
                name: test_username,
                email: test_email,
                password: test_password
            })
            .then((res) => {
                const body = res.body;
                token = res.body.token;
                expect(body).to.contain.property('token');
                expect(body).to.contain.property('user');
                done();
            })
            .catch((err) => done(err));
    
        });


    });

})


describe('POST case/add', () => {

    it('OK, creating a new case works', (done) => {

        request(app).post('/api/case/add').send({
            idNumber: "12345",
            priority: 4,
            isChildrenCase: true,
            startupDate: Date.now(),
            registeredDate: Date.now(),
            category: "category",
            district: "district",
            description: "text description",
            referredFrom: "Referred from",
            important: true
        })
        .then((res) => {
            const body = res.body;
            console.log("RESPONSE", body);
           // expect(body).to.contain.property('_id');
            expect(body).to.contain.property('msg');
            done();
        })
        .catch((err) => done(err));

    })

})