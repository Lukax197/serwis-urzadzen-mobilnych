'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUrlSlugs = require('mongoose-url-slugs');

var _mongooseUrlSlugs2 = _interopRequireDefault(_mongooseUrlSlugs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Song = _mongoose2.default.Schema({
   title: String
}, {
   timestamps: true
});

Song.plugin((0, _mongooseUrlSlugs2.default)('title', { field: 'slug', update: true }));

exports.default = _mongoose2.default.model('Song', Song);