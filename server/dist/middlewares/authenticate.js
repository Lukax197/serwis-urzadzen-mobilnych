'use strict';

var jwt = require('jsonwebtoken');

var authenticate = function authenticate(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];

    // const token = req.cookies.JWT

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

module.exports = authenticate;