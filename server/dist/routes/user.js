"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = require('../middlewares/authenticate');

exports.default = function () {
    var api = (0, _express.Router)();

    api.get('/:id', _userController2.default.findOne);

    api.get('/', _userController2.default.findAll);

    api.get('/dane-osobowe/:username', _userController2.default.getUserDaneOsobowe);

    api.post('/', _userController2.default.create);

    api.put('/:id', _userController2.default.update);

    api.delete('/:id', _userController2.default.remove);

    api.get('/count/:id', _userController2.default.userCount);

    return api;
};