const { assert } = require('chai');
const request = require('./request');
// const Company = require('../../lib/models/Company');
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
            state: 'WA'
        },
        size: 222222,
        isHip: false,
        keywords: ['ok', 'i', 'guess']
    };

    it('saves a company and gets', () => {
        return request.post('/companies')
            .send(apple)
            .then(({ body }) => {
                const { _id, __v, joined } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(joined);
                assert.deepEqual(body, {
                    _id, __v, joined,
                    ...apple
                });
                apple = body;
            });
    });


});