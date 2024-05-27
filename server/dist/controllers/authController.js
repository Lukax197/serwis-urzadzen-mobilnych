"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _register = require("babel-core/register");

var _register2 = _interopRequireDefault(_register);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _SentEmails = require("../models/SentEmails");

var _SentEmails2 = _interopRequireDefault(_SentEmails);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = require('jsonwebtoken');

var _require = require('../mailers/appMailer'),
    registerNotify = _require.registerNotify;

var jwtDecode = require('jwt-decode');

exports.default = {
    login: function login(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _req$body, email, pwd, foundUser, match, userInfo, accessToken, refreshToken;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _req$body = req.body, email = _req$body.email, pwd = _req$body.pwd;

                            if (!(!email || !pwd)) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt("return", res.status(400).json({ 'message': 'Username and password are required.' }));

                        case 3:
                            _context.next = 5;
                            return _User2.default.findOne({ email: email });

                        case 5:
                            foundUser = _context.sent;

                            if (foundUser) {
                                _context.next = 8;
                                break;
                            }

                            return _context.abrupt("return", res.sendStatus(401));

                        case 8:
                            _context.next = 10;
                            return _bcrypt2.default.compare(pwd, foundUser.password);

                        case 10:
                            match = _context.sent;
                            userInfo = {
                                "UserInfo": {
                                    "id": foundUser._id,
                                    "username": foundUser.nazwaUzytkownika,
                                    "roles": foundUser.roles
                                }
                            };

                            if (!match) {
                                _context.next = 21;
                                break;
                            }

                            accessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: 20 });
                            refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 });
                            _context.next = 17;
                            return _User2.default.findOneAndUpdate({ '_id': foundUser._id }, { refreshToken: refreshToken });

                        case 17:

                            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                            res.send({ accessToken: accessToken, refreshToken: refreshToken });
                            _context.next = 22;
                            break;

                        case 21:
                            res.sendStatus(401);

                        case 22:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    register: function register(req, res) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _req$body2, email, pwd, nazwaUzytkownika, daneOsobowe, duplicate, hashedPwd;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            // pobranie przesłanych wartości i sprawdzenie poprawności
                            _req$body2 = req.body, email = _req$body2.email, pwd = _req$body2.pwd, nazwaUzytkownika = _req$body2.nazwaUzytkownika, daneOsobowe = _req$body2.daneOsobowe;

                            if (!(!email || !pwd)) {
                                _context2.next = 3;
                                break;
                            }

                            return _context2.abrupt("return", res.status(400).json({ 'message': 'Username and password are required.' }));

                        case 3:
                            _context2.next = 5;
                            return _User2.default.findOne({ email: email });

                        case 5:
                            duplicate = _context2.sent;

                            if (!duplicate) {
                                _context2.next = 8;
                                break;
                            }

                            return _context2.abrupt("return", res.sendStatus(409));

                        case 8:
                            _context2.next = 10;
                            return _User2.default.findOne({ nazwaUzytkownika: nazwaUzytkownika });

                        case 10:
                            duplicate = _context2.sent;

                            if (!duplicate) {
                                _context2.next = 13;
                                break;
                            }

                            return _context2.abrupt("return", res.sendStatus(410));

                        case 13:
                            _context2.prev = 13;
                            _context2.next = 16;
                            return _bcrypt2.default.hash(pwd, 10);

                        case 16:
                            hashedPwd = _context2.sent;
                            _context2.next = 19;
                            return _User2.default.create({
                                "nazwaUzytkownika": nazwaUzytkownika,
                                "email": email,
                                "password": hashedPwd,
                                "daneOsobowe": daneOsobowe
                            });

                        case 19:

                            // wysłanie emaila potwierdzającego
                            registerNotify({ to: email, name: nazwaUzytkownika });
                            _context2.next = 22;
                            return _SentEmails2.default.create({ adresat: email, typWiadomosci: 'Potwierdzenie utworzenia konta' });

                        case 22:

                            res.status(201).json({ 'success': "New user " + nazwaUzytkownika + " created!" });
                            _context2.next = 28;
                            break;

                        case 25:
                            _context2.prev = 25;
                            _context2.t0 = _context2["catch"](13);

                            res.status(500).json({ 'message': _context2.t0.message });

                        case 28:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[13, 25]]);
        }))();
    },
    refresh: function refresh(req, res) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var refreshToken, userInfo, accessToken;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            refreshToken = req.cookies.jwt;

                            if (refreshToken) {
                                _context3.next = 3;
                                break;
                            }

                            return _context3.abrupt("return", res.status(401));

                        case 3:
                            _context3.prev = 3;
                            _context3.next = 6;
                            return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                        case 6:
                            _context3.next = 11;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3["catch"](3);
                            return _context3.abrupt("return", res.sendStatus(403));

                        case 11:
                            userInfo = { "UserInfo": jwtDecode(refreshToken).UserInfo };
                            accessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: 86400 });


                            res.send({ accessToken: accessToken });

                        case 14:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[3, 8]]);
        }))();
    },
    logout: function logout(req, res) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var refreshToken, foundUser, result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            refreshToken = req.cookies.jwt;
                            _context4.next = 3;
                            return _User2.default.findOne({ refreshToken: refreshToken });

                        case 3:
                            foundUser = _context4.sent;

                            if (foundUser) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.abrupt("return", res.sendStatus(204));

                        case 6:

                            foundUser.refreshToken = foundUser.refreshToken.filter(function (rt) {
                                return rt !== refreshToken;
                            });
                            result = foundUser.save();

                            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

                            res.sendStatus(200);

                        case 10:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    }
};