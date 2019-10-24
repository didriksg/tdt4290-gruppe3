
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');




describe('POST user/register', () => {
   

    it('OK, creating a new user works', (done) => {

        request(app).post('/api/user/register').send({
            name: "Tesster",
            email: "ttest@emaail.com",
            password: "abc123"
        })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('token');
            expect(body).to.contain.property('user');
            done();
        })
        .catch((err) => done(err));

    })


    it('Fail, request requires all fields ', (done) => {

        request(app).post('/api/user/register').send({
            password: "Missing fields"
        })
        .then((res) => {
            expect(res.body.msg).to.equal('Please enter all fields');
            done();
        })
        .catch((err) => done(err));

    })


})
