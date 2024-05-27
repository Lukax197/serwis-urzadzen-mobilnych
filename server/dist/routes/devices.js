"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _devicesController = require("../controllers/devicesController");

var _devicesController2 = _interopRequireDefault(_devicesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var api = (0, _express.Router)();

    api.get('/', _devicesController2.default.findAll);

    api.get('/urzadzenia-count', _devicesController2.default.findAllWithCount);

    api.post('/', _devicesController2.default.create);

    api.delete('/:id', _devicesController2.default.remove);

    api.get('/:id', _devicesController2.default.findOne);

    api.put('/:id', _devicesController2.default.update);

    return api;
};