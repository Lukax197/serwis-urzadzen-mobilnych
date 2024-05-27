'use strict';

var allowedOrigins = require('../config/allowedOrigins');

var credentials = function credentials(req, res, next) {
    var origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};

module.exports = credentials;