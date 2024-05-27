'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _errors = require('../middlewares/errors');

var _songsController = require('../controllers/songsController');

var _songsController2 = _interopRequireDefault(_songsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = require('../middlewares/authenticate');

exports.default = function () {
    var api = (0, _express.Router)();

    // GET /songs/:slug
    api.get('/:slug', (0, _errors.catchAsync)(_songsController2.default.findOne));

    // GET /songs
    api.get('/', authenticate, (0, _errors.catchAsync)(_songsController2.default.findAll));

    // POST /songs
    api.post('/', (0, _errors.catchAsync)(_songsController2.default.create));

    // PUT /songs/:slug
    api.put('/:slug', (0, _errors.catchAsync)(_songsController2.default.update));

    // DELETE /songs/:slug
    api.delete('/:slug', (0, _errors.catchAsync)(_songsController2.default.remove));

    return api;
};