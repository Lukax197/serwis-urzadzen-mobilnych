'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _double = require('@mongoosejs/double');

var _double2 = _interopRequireDefault(_double);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceSchema = _mongoose2.default.Schema({
    nazwaUrzadzenia: String,
    typUrzadzenia: String,
    uslugi: [{
        nazwaUslugi: String,
        typUrzadzenia: String,
        cenaPodstawowa: _double2.default,
        cenaZaGodzine: _double2.default,
        przewidywanyCzas: _double2.default,
        kosztCzesci: _double2.default
    }]
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('Devices', DeviceSchema);