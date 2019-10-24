
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');




describe('POST /register', () => {
   

    it('OK, creating a new user works', (done) => {

        request(app).post('/register').send({
            name: "Test Tester",
            email: "test@email.com",
            password: "abc123"
        })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('email');
            expect(body).to.contain.property('text');
            done();
        })
        .catch((err) => done(err));

    })


})
