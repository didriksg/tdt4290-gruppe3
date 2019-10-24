
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');




describe('POST /register', () => {
   

    it('OK, creating a new user works', (done) => {

        request(app).post('/api/user/register').send({
            name: "Test Tester",
            email: "test@email.com",
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


})
