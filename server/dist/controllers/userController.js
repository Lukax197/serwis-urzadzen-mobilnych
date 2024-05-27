'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findOne: function findOne(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var userFromDB, userToSend;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _User2.default.findOne({ _id: req.params.id }, { nazwaUzytkownika: 1, email: 1, roles: 1, daneOsobowe: 1 });

                        case 2:
                            userFromDB = _context.sent;

                            if (userFromDB) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 5:
                            userToSend = {
                                id: userFromDB._id,
                                nazwaUzytkownika: userFromDB.nazwaUzytkownika,
                                email: userFromDB.email,
                                roles: userFromDB.roles,
                                daneOsobowe: userFromDB.daneOsobowe
                            };
                            return _context.abrupt('return', res.status(200).send(userToSend));

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    getUserDaneOsobowe: function getUserDaneOsobowe(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var userFromDB;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _User2.default.findOne({ nazwaUzytkownika: req.params.username }, { _id: 0, email: 1, daneOsobowe: 1 });

                        case 2:
                            userFromDB = _context2.sent;
                            return _context2.abrupt('return', res.status(200).send(userFromDB));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    findAll: function findAll(req, res) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var usersFromDB, usersToSend;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _User2.default.find({}, { nazwaUzytkownika: 1, email: 1, roles: 1, daneOsobowe: 1 });

                        case 2:
                            usersFromDB = _context3.sent;
                            usersToSend = [];


                            if (usersFromDB !== null) {
                                usersFromDB.forEach(function (item) {
                                    usersToSend.push({
                                        id: item._id,
                                        nazwaUzytkownika: item.nazwaUzytkownika,
                                        email: item.email,
                                        roles: item.roles,
                                        daneOsobowe: item.daneOsobowe
                                    });
                                });
                            }

                            return _context3.abrupt('return', res.status(200).send(usersToSend));

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
            var _req$body, nazwaUzytkownika, email, pwd, roles, daneOsobowe, duplicate, hashedPwd;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _req$body = req.body, nazwaUzytkownika = _req$body.nazwaUzytkownika, email = _req$body.email, pwd = _req$body.pwd, roles = _req$body.roles, daneOsobowe = _req$body.daneOsobowe;

                            if (!(!email || !pwd)) {
                                _context4.next = 3;
                                break;
                            }

                            return _context4.abrupt('return', res.status(400).json({ 'message': 'Username and password are required.' }));

                        case 3:
                            _context4.next = 5;
                            return _User2.default.findOne({ email: email });

                        case 5:
                            duplicate = _context4.sent;

                            if (!duplicate) {
                                _context4.next = 8;
                                break;
                            }

                            return _context4.abrupt('return', res.sendStatus(409));

                        case 8:
                            _context4.next = 10;
                            return _User2.default.findOne({ nazwaUzytkownika: nazwaUzytkownika });

                        case 10:
                            duplicate = _context4.sent;

                            if (!duplicate) {
                                _context4.next = 13;
                                break;
                            }

                            return _context4.abrupt('return', res.sendStatus(410));

                        case 13:
                            _context4.prev = 13;
                            _context4.next = 16;
                            return _bcrypt2.default.hash(pwd, 10);

                        case 16:
                            hashedPwd = _context4.sent;
                            _context4.next = 19;
                            return _User2.default.create({
                                "nazwaUzytkownika": nazwaUzytkownika,
                                "email": email,
                                "password": hashedPwd,
                                "daneOsobowe": daneOsobowe,
                                "roles": roles
                            });

                        case 19:

                            res.status(201).json({ 'success': 'New user ' + nazwaUzytkownika + ' created!' });
                            _context4.next = 25;
                            break;

                        case 22:
                            _context4.prev = 22;
                            _context4.t0 = _context4['catch'](13);

                            res.status(500).json({ 'message': _context4.t0.message });

                        case 25:
                            return _context4.abrupt('return', res.status(201).send());

                        case 26:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[13, 22]]);
        }))();
    },
    update: function update(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var _req$body2, user, updatedUser, duplicate, userToSave, hashedPwd;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            // pobranie przesłanych wartości i sprawdzenie poprawności
                            _req$body2 = req.body, user = _req$body2.user, updatedUser = _req$body2.updatedUser;

                            if (!(!updatedUser.email || !updatedUser.nazwaUzytkownika)) {
                                _context5.next = 3;
                                break;
                            }

                            return _context5.abrupt('return', res.status(400).json({ 'message': 'Username and password are required.' }));

                        case 3:
                            if (!(user.email !== updatedUser.email)) {
                                _context5.next = 9;
                                break;
                            }

                            _context5.next = 6;
                            return _User2.default.findOne({ email: updatedUser.email });

                        case 6:
                            duplicate = _context5.sent;

                            if (!duplicate) {
                                _context5.next = 9;
                                break;
                            }

                            return _context5.abrupt('return', res.sendStatus(409));

                        case 9:
                            if (!(user.nazwaUzytkownika !== updatedUser.nazwaUzytkownika)) {
                                _context5.next = 15;
                                break;
                            }

                            _context5.next = 12;
                            return _User2.default.findOne({ nazwaUzytkownika: updatedUser.nazwaUzytkownika });

                        case 12:
                            duplicate = _context5.sent;

                            if (!duplicate) {
                                _context5.next = 15;
                                break;
                            }

                            return _context5.abrupt('return', res.sendStatus(410));

                        case 15:
                            _context5.prev = 15;

                            if (!(updatedUser.noweHaslo !== undefined)) {
                                _context5.next = 23;
                                break;
                            }

                            _context5.next = 19;
                            return _bcrypt2.default.hash(updatedUser.noweHaslo, 10);

                        case 19:
                            hashedPwd = _context5.sent;

                            userToSave = {
                                "nazwaUzytkownika": updatedUser.nazwaUzytkownika,
                                "email": updatedUser.email,
                                "password": hashedPwd,
                                "roles": updatedUser.roles,
                                "daneOsobowe": updatedUser.daneOsobowe
                            };
                            _context5.next = 24;
                            break;

                        case 23:
                            userToSave = {
                                "nazwaUzytkownika": updatedUser.nazwaUzytkownika,
                                "email": updatedUser.email,
                                "roles": updatedUser.roles,
                                "daneOsobowe": updatedUser.daneOsobowe
                            };

                        case 24:
                            _context5.next = 26;
                            return _User2.default.findOneAndUpdate({ '_id': user.id }, userToSave);

                        case 26:

                            res.status(201).json({ 'success': 'User ' + updatedUser.nazwaUzytkownika + ' was edited!' });
                            _context5.next = 32;
                            break;

                        case 29:
                            _context5.prev = 29;
                            _context5.t0 = _context5['catch'](15);

                            res.status(500).json({ 'message': _context5.t0.message });

                        case 32:
                            return _context5.abrupt('return', res.status(201).send());

                        case 33:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[15, 29]]);
        }))();
    },
    remove: function remove(req, res, next) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var user;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _User2.default.findOneAndRemove({ '_id': req.params.id });

                        case 2:
                            user = _context6.sent;

                            if (user) {
                                _context6.next = 5;
                                break;
                            }

                            return _context6.abrupt('return', next());

                        case 5:
                            return _context6.abrupt('return', res.status(200).send({ message: 'User was removed' }));

                        case 6:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },
    userCount: function userCount(req, res, next) {
        var _this7 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var startOfCurrentMonth, startOfNextMonth, countThisMonth, countLastMonth;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            startOfCurrentMonth = new Date();

                            startOfCurrentMonth.setDate(1);
                            startOfNextMonth = new Date();

                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
                            _context7.prev = 5;
                            _context7.next = 8;
                            return _User2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            }).count();

                        case 8:
                            countThisMonth = _context7.sent;


                            startOfCurrentMonth = new Date();
                            startOfCurrentMonth.setDate(1);
                            startOfCurrentMonth.setMonth(startOfCurrentMonth.getMonth() - 1);
                            startOfNextMonth = new Date();
                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth());

                            _context7.next = 17;
                            return _User2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            }).count();

                        case 17:
                            countLastMonth = _context7.sent;
                            _context7.next = 23;
                            break;

                        case 20:
                            _context7.prev = 20;
                            _context7.t0 = _context7['catch'](5);
                            return _context7.abrupt('return', res.status(500).send(_context7.t0.message));

                        case 23:
                            return _context7.abrupt('return', res.status(200).send({ countThisMonth: countThisMonth, countLastMonth: countLastMonth }));

                        case 24:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7, [[5, 20]]);
        }))();
    }
};