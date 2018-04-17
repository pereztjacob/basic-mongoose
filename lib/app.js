const express = require('express');
const app = express();
const companies = require('./routes/companies');

app.use(express.json());

app.use('/companies', companies);

module.exports = app;