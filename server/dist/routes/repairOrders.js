"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _repairOrdersController = require("../controllers/repairOrdersController");

var _repairOrdersController2 = _interopRequireDefault(_repairOrdersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var api = (0, _express.Router)();

    api.get('/:id', _repairOrdersController2.default.findOne);

    api.get('/', _repairOrdersController2.default.findAll);

    api.get('/zgloszenia-uzytkownik/:id', _repairOrdersController2.default.findByUserId);

    api.post('/', _repairOrdersController2.default.create);

    api.get('/zgloszenia-count/:id', _repairOrdersController2.default.zleceniaCount);

    api.get('/zgloszenia-dochod/:id', _repairOrdersController2.default.zleceniaDochodSum);

    api.put('/dane-zgloszenia/:id', _repairOrdersController2.default.updateDaneZgloszenia);

    api.put('/dokument-serwisowy/:id', _repairOrdersController2.default.updateDokumentSerwisowy);

    api.put('/status-zgloszenia/:id', _repairOrdersController2.default.updateStatusZgloszenia);

    api.delete('/:id', _repairOrdersController2.default.remove);

    return api;
};