const router = require('express').Router();
const Company = require('../models/Company');
const errorHandler = require('../error-handler');

module.exports = router

    .post('/', (req, res) => {
        Company.create(req.body)
            .then(company => res.json(company))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {

        const { id } = req.params;

        Company.findById(id)
            .lean()
            .then(company => {
                if(!company) {
                    errorHandler({
                        status: 404,
                        error: `company with id ${id} does not exist`
                    }, req, res);
                }
                else {
                    res.json(company);
                }
            })
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {

        const { id } = req.params;

        Company.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
            .then(company => res.json(company))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Company.find(req.query)
            .lean()
            .then(company => res.json(company))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Company.findByIdAndRemove(id)
            .lean()
            .then(removed => res.json(removed))
            .catch(err => errorHandler(err, req, res));
    });