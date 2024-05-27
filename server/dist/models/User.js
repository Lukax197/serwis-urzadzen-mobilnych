"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
    nazwaUzytkownika: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    daneOsobowe: {
        imie: String,
        nazwisko: String,
        adres: String,
        kodPocztowy: String,
        miasto: String,
        nrTelefonu: String
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Employee: Number,
        Admin: Number
    },
    refreshToken: [String]
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('User', UserSchema);