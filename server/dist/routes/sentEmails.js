"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _sentEmailsController = require("../controllers/sentEmailsController");

var _sentEmailsController2 = _interopRequireDefault(_sentEmailsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var api = (0, _express.Router)();

    api.get('/', _sentEmailsController2.default.findAll);

    api.post('/sendEmail', _sentEmailsController2.default.sendEmail);

    return api;
};