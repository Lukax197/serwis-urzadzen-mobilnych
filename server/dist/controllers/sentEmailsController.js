'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SentEmails = require('../models/SentEmails');

var _SentEmails2 = _interopRequireDefault(_SentEmails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../mailers/appMailer'),
    sendText = _require.sendText;

exports.default = {
    findAll: function findAll(req, res) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var sentEmailsFromDB, sentEmailsToSent;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _SentEmails2.default.find();

                        case 2:
                            sentEmailsFromDB = _context.sent;
                            sentEmailsToSent = [];


                            if (sentEmailsFromDB !== null) {
                                sentEmailsFromDB.forEach(function (item) {
                                    var date = new Date(item.createdAt);

                                    sentEmailsToSent.push({
                                        id: item._id,
                                        adresat: item.adresat,
                                        typWiadomosci: item.typWiadomosci,
                                        dataWyslania: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                                    });
                                });
                            }

                            return _context.abrupt('return', res.status(200).send(sentEmailsToSent));

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    sendEmail: function sendEmail(req, res) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _req$body, email, temat, tresc;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _req$body = req.body, email = _req$body.email, temat = _req$body.temat, tresc = _req$body.tresc;
                            _context2.prev = 1;

                            sendText({
                                to: email,
                                temat: temat,
                                tresc: tresc
                            });

                            _context2.next = 5;
                            return _SentEmails2.default.create({ adresat: email, typWiadomosci: 'Wysłanie wiadomości' });

                        case 5:
                            _context2.next = 10;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](1);
                            return _context2.abrupt('return', res.status(500).send({ message: _context2.t0.message }));

                        case 10:
                            return _context2.abrupt('return', res.status(200).send({ message: 'Email was sent' }));

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[1, 7]]);
        }))();
    }
};