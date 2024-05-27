'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Device = require('../models/Device');

var _Device2 = _interopRequireDefault(_Device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findOne: function findOne(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var usluga;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _Device2.default.findOne({ _id: req.params.id }, { nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 });

                        case 2:
                            usluga = _context.sent;

                            if (usluga) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 5:
                            return _context.abrupt('return', res.status(200).send(usluga));

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    findAll: function findAll(req, res) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var devices;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _Device2.default.find({}, { _id: 0, nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 });

                        case 2:
                            devices = _context2.sent;
                            return _context2.abrupt('return', res.status(200).send(devices));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    findAllWithCount: function findAllWithCount(req, res) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var devicesFromDB, devicesToSend;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _Device2.default.find({}, { nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 });

                        case 2:
                            devicesFromDB = _context3.sent;
                            devicesToSend = [];


                            if (devicesFromDB !== null) {
                                devicesFromDB.forEach(function (item) {
                                    devicesToSend.push({
                                        id: item._id,
                                        nazwaUrzadzenia: item.nazwaUrzadzenia,
                                        typUrzadzenia: item.typUrzadzenia,
                                        iloscUslug: item.uslugi.length
                                    });
                                });
                            }

                            return _context3.abrupt('return', res.status(200).send(devicesToSend));

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    create: function create(req, res) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var _req$body, nazwaUrzadzenia, typUrzadzenia, uslugi, urzadzenie;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _req$body = req.body, nazwaUrzadzenia = _req$body.nazwaUrzadzenia, typUrzadzenia = _req$body.typUrzadzenia, uslugi = _req$body.uslugi;
                            _context4.next = 3;
                            return new _Device2.default({
                                nazwaUrzadzenia: nazwaUrzadzenia,
                                typUrzadzenia: typUrzadzenia,
                                uslugi: uslugi
                            }).save();

                        case 3:
                            urzadzenie = _context4.sent;
                            return _context4.abrupt('return', res.status(201).send({ message: 'New device has been added' }));

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    update: function update(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var _req$body2, nazwaUrzadzenia, typUrzadzenia, uslugi, urzadzenia;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _req$body2 = req.body, nazwaUrzadzenia = _req$body2.nazwaUrzadzenia, typUrzadzenia = _req$body2.typUrzadzenia, uslugi = _req$body2.uslugi;
                            _context5.next = 3;
                            return _Device2.default.findOneAndUpdate({ '_id': req.params.id }, {
                                nazwaUrzadzenia: nazwaUrzadzenia,
                                typUrzadzenia: typUrzadzenia,
                                uslugi: uslugi
                            });

                        case 3:
                            urzadzenia = _context5.sent;

                            if (urzadzenia) {
                                _context5.next = 6;
                                break;
                            }

                            return _context5.abrupt('return', next());

                        case 6:
                            return _context5.abrupt('return', res.status(200).send({ message: 'Device was updated' }));

                        case 7:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },
    remove: function remove(req, res, next) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var urzadzenie;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _Device2.default.findOneAndRemove({ '_id': req.params.id });

                        case 2:
                            urzadzenie = _context6.sent;

                            if (urzadzenie) {
                                _context6.next = 5;
                                break;
                            }

                            return _context6.abrupt('return', next());

                        case 5:
                            return _context6.abrupt('return', res.status(200).send({ message: 'Device was removed' }));

                        case 6:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    }
};