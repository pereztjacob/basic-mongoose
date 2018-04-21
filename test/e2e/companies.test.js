const { assert } = require('chai');
const request = require('./request');
const Company = require('../../lib/models/Company');
const { dropCollection } = require('./db');

describe('Company API', () => {
    
    before(() => dropCollection('companies'));

    let apple = {
        name: 'Apple',
        description: 'ok stuff',
        address: {
            street: 'X iPhone St.',
            city: 'Aberdeen',
            zip: '98666',
            state: {
                'enum': []
            }
        },
        size: 222222,
        isHip: false,
        keywords: ['ok', 'i', 'guess'],
        type: 'For-profit'
    };

    let samsung = {
        name: 'samsung',
        description: 'ok stuff',
        address: {
            street: 'X iPhone St.',
            city: 'Aberdeen',
            zip: '98666',
            state: {
                'enum': []
            }
        },
        size: 222222,
        isHip: false,
        keywords: ['ok', 'i', 'guess'],
        type: 'For-profit'
    };

    it('saves a company and gets', () => {
        return request.post('/companies')
            .send(apple)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...apple
                });
                apple = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets comp by id', () => {
        return Company.create(samsung).then(roundTrip)
            .then(saved => {
                samsung = saved;
                return request.get(`/companies/${samsung._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, samsung);
            });
    });

    it('get all', () => {
        return request.get('/companies')
            .then(({ body }) => {
                assert.deepEqual(body, [apple, samsung]);
            });
    });

    it('update company', () => {
        samsung.description = 'fishers';

        return request.put(`/companies/${samsung._id}`)
            .send(samsung)
            .then(({ body }) => {
                assert.deepEqual(body, samsung);
                return Company.findById(samsung._id).then(roundTrip);
            })
            .then(updated => {
                return assert.deepEqual(updated, samsung);
            });
    });


});