const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');




describe('User model tests', () => {

    it('Fails, request requires all fields ', (done) => {


        request(app).post('/api/user/register').send({
            password: 'Test password'
        })
        .then((res) => {
            console.log("REGISTER MISSING FIELDS RESPONSE::::", res.body)
            expect(res.body.msg).to.equal('Please enter all fields');
            done();
        })
        .catch((err) => done(err));

    })




});