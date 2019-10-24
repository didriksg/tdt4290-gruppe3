
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');

/*


describe('POST case/add', () => {
   

    it('OK, creating a new case works', (done) => {

        request(app).post('/api/case/add').send({
            idNumber = req.body.idNumber,
            priority = req.body.priority,
            isChildrenCase = req.body.isChildrenCase,
            startupDate = req.body.startupDate,
            registeredDate = req.body.registeredDate,
            category = req.body.category,
            district = req.body.district,
            description = req.body.description,
            referredFrom = req.body.referredFrom,
            important = req.body.important
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

*/