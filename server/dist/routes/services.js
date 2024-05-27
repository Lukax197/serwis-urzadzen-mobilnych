"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _servicesController = require("../controllers/servicesController");

var _servicesController2 = _interopRequireDefault(_servicesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var api = (0, _express.Router)();

    // GET /songs/:slug
    api.get('/:typeName', _servicesController2.default.findByType);

    // GET /songs
    api.get('/', _servicesController2.default.findAll);

    api.post('/', _servicesController2.default.create);

    // PUT /songs/:slug
    api.put('/:id', _servicesController2.default.update);

    // DELETE /songs/:slug
    api.delete('/:id', _servicesController2.default.remove);

    return api;
};