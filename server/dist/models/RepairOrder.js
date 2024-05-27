'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _double = require('@mongoosejs/double');

var _double2 = _interopRequireDefault(_double);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RepairOrderSchema = _mongoose2.default.Schema({
    nrZgloszenia: {
        type: String,
        trim: true,
        required: true
    },
    typUrzadzenia: {
        type: String,
        trim: true,
        required: true
    },
    modelMarka: {
        type: String,
        trim: true,
        required: true
    },
    imeiNrSeryjny: {
        type: String,
        trim: true,
        required: true
    },
    zamowioneUslugi: [{
        value: String,
        label: String,
        cenaPodstawowa: _double2.default,
        cenaZaGodzine: _double2.default,
        przewidywanyCzas: _double2.default,
        kosztCzesci: _double2.default
    }],
    opisProblemu: {
        type: String,
        trim: true
    },
    trybZgloszenia: {
        type: String,
        trim: true,
        required: true
    },
    daneKontaktowe: {
        email: String,
        imie: String,
        nazwisko: String,
        adres: String,
        kodPocztowy: String,
        miasto: String,
        nrTelefonu: String
    },
    metodaDostawy: {
        type: String,
        trim: true,
        required: true
    },
    zgodaRegulamin: Boolean,
    zgodaPrzetwarzanie: Boolean,
    zgodaMarketing: Boolean,
    status: String,
    dokumentacjaSerwisowa: {
        opis: String,
        wykonaneUslugi: [{
            nazwa: String,
            roboczogodziny: _double2.default,
            cena: _double2.default
        }],
        czesci: [{
            nazwa: String,
            ilosc: Number,
            cena: _double2.default
        }],
        cenaSuma: {
            type: _double2.default,
            default: 0.0
        }
    },
    userId: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('RepairOrder', RepairOrderSchema);