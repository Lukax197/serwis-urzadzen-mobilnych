"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SentEmailsSchema = _mongoose2.default.Schema({
    adresat: {
        type: String,
        trim: true,
        required: true
    },
    typWiadomosci: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('SentEmails', SentEmailsSchema);