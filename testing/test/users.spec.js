const server = require('../api/server');
const request = require('supertest');
const { expect } = require('chai');

describe('Test', () => {

    describe('User service tests', () => {

        it('should return status 200', (done) => {
            request(server)
                .get('/users')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.equal({
                        users: [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }]
                    });
                })

            done()
        });

    });

});
