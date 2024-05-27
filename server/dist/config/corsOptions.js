'use strict';

var allowedOrigins = require('./allowedOrigins');

var corsOptions = {
    origin: function origin(_origin, callback) {
        if (allowedOrigins.indexOf(_origin) !== -1 || !_origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;