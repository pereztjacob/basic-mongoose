const router = require('express').Router();
const Company = require('../models/Company');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Company.create(req.body)
            .then(company => res.json(company))
            .catch(err => errorHandler(err, req, res));
    });