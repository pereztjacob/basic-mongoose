/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbURI) {
    const promise = mongoose.connect(dbURI);

    mongoose.connection.on('connected', () => {
        console.log('mongoose connection opened to: ', dbURI);
    });

    mongoose.connection.on('error', err => {
        console.log('Mongoose connection ERR', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose disconnected: sigint');
            process.exit(0);
        });
    });

    return promise;
};