'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Usluga = require('../models/Usluga');

var _Usluga2 = _interopRequireDefault(_Usluga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findByType: function findByType(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var uslugi;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _Usluga2.default.find({ typUrzadzenia: req.params.typeName, nazwaUslugi: { "$ne": 'Inne' } }, { _id: 0, nazwaUslugi: 1, typUrzadzenia: 1, cenaPodstawowa: 1, cenaZaGodzine: 1, przewidywanyCzas: 1, kosztCzesci: 1 });

                        case 2:
                            uslugi = _context.sent;

                            if (uslugi) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 5:
                            return _context.abrupt('return', res.status(200).send(uslugi));

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
            var servicesFromDB, servicesToSend;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _Usluga2.default.find();

                        case 2:
                            servicesFromDB = _context2.sent;
                            servicesToSend = [];


                            if (servicesFromDB !== null) {
                                servicesFromDB.forEach(function (item) {
                                    servicesToSend.push({
                                        id: item._id,
                                        nazwaUslugi: item.nazwaUslugi,
                                        typUrzadzenia: item.typUrzadzenia,
                                        cenaPodstawowa: item.cenaPodstawowa,
                                        cenaZaGodzine: item.cenaZaGodzine,
                                        przewidywanyCzas: item.przewidywanyCzas,
                                        kosztCzesci: item.kosztCzesci
                                    });
                                });
                            }

                            return _context2.abrupt('return', res.status(200).send(servicesToSend));

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    create: function create(req, res) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _req$body, nazwaUslugi, typUrzadzenia, cenaPodstawowa, cenaZaGodzine, przewidywanyCzas, kosztCzesci, usluga;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _req$body = req.body, nazwaUslugi = _req$body.nazwaUslugi, typUrzadzenia = _req$body.typUrzadzenia, cenaPodstawowa = _req$body.cenaPodstawowa, cenaZaGodzine = _req$body.cenaZaGodzine, przewidywanyCzas = _req$body.przewidywanyCzas, kosztCzesci = _req$body.kosztCzesci;

                            // var value = nazwaUslugi.toLowerCase().replace(' ', '_')

                            _context3.next = 3;
                            return new _Usluga2.default({
                                nazwaUslugi: nazwaUslugi,
                                typUrzadzenia: typUrzadzenia,
                                cenaPodstawowa: cenaPodstawowa,
                                cenaZaGodzine: cenaZaGodzine,
                                przewidywanyCzas: przewidywanyCzas,
                                kosztCzesci: kosztCzesci
                            }).save();

                        case 3:
                            usluga = _context3.sent;
                            return _context3.abrupt('return', res.status(201).send({ id: usluga._id }));

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    update: function update(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var updatedUsluga;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            updatedUsluga = req.body.updatedUsluga;
                            _context4.prev = 1;
                            _context4.next = 4;
                            return _Usluga2.default.findOneAndUpdate({ _id: req.params.id }, updatedUsluga);

                        case 4:

                            res.status(201).json({ 'success': 'Service was edited!' });
                            _context4.next = 11;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4['catch'](1);

                            console.log(_context4.t0.message);
                            res.status(500).json({ 'message': _context4.t0.message });

                        case 11:
                            return _context4.abrupt('return', res.status(201).send());

                        case 12:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[1, 7]]);
        }))();
    },
    remove: function remove(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var usluga;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _Usluga2.default.findOneAndRemove({ '_id': req.params.id });

                        case 2:
                            usluga = _context5.sent;

                            if (usluga) {
                                _context5.next = 5;
                                break;
                            }

                            return _context5.abrupt('return', next());

                        case 5:
                            return _context5.abrupt('return', res.status(200).send({ message: 'Service was removed' }));

                        case 6:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    }
};