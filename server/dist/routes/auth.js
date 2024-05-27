"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _authController = require("../controllers/authController");

var _authController2 = _interopRequireDefault(_authController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var api = (0, _express.Router)();

    api.post('/login', _authController2.default.login);

    api.post('/register', _authController2.default.register);

    api.get('/refresh', _authController2.default.refresh);

    api.get('/logout', _authController2.default.logout);

    return api;
};