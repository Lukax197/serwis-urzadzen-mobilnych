'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _RepairOrder = require('../models/RepairOrder');

var _RepairOrder2 = _interopRequireDefault(_RepairOrder);

var _SentEmails = require('../models/SentEmails');

var _SentEmails2 = _interopRequireDefault(_SentEmails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../mailers/appMailer'),
    zgloszenieNotify = _require.zgloszenieNotify,
    zmianaStatusuNotify = _require.zmianaStatusuNotify,
    podsumowanieNotify = _require.podsumowanieNotify;

exports.default = {
    findOne: function findOne(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var orderFromDB, date, orderToSend;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _RepairOrder2.default.findOne({ _id: req.params.id });

                        case 2:
                            orderFromDB = _context.sent;

                            if (orderFromDB) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 5:
                            date = new Date(orderFromDB.createdAt);
                            orderToSend = {
                                id: orderFromDB._id,
                                nrZgloszenia: orderFromDB.nrZgloszenia,
                                typUrzadzenia: orderFromDB.typUrzadzenia,
                                modelMarka: orderFromDB.modelMarka,
                                imeiNrSeryjny: orderFromDB.imeiNrSeryjny,
                                zamowioneUslugi: orderFromDB.zamowioneUslugi,
                                opisProblemu: orderFromDB.opisProblemu,
                                trybZgloszenia: orderFromDB.trybZgloszenia,
                                daneKontaktowe: orderFromDB.daneKontaktowe,
                                metodaDostawy: orderFromDB.metodaDostawy,
                                zgodaRegulamin: orderFromDB.zgodaRegulamin,
                                zgodaPrzetwarzanie: orderFromDB.zgodaPrzetwarzanie,
                                zgodaMarketing: orderFromDB.zgodaMarketing,
                                status: orderFromDB.status,
                                dokumentacjaSerwisowa: orderFromDB.dokumentacjaSerwisowa,
                                dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                            };
                            return _context.abrupt('return', res.status(200).send(orderToSend));

                        case 8:
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
            var ordersFromDB, ordersToSend;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _RepairOrder2.default.find({}, { modelMarka: 1, zamowioneUslugi: 1, status: 1, createdAt: 1 });

                        case 2:
                            ordersFromDB = _context2.sent;
                            ordersToSend = [];


                            if (ordersFromDB !== null) {
                                ordersFromDB.forEach(function (item) {
                                    var date = new Date(item.createdAt);

                                    ordersToSend.push({
                                        id: item._id,
                                        modelMarka: item.modelMarka,
                                        zamowioneUslugi: item.zamowioneUslugi,
                                        status: item.status,
                                        dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                                    });
                                });
                            }

                            return _context2.abrupt('return', res.status(200).send(ordersToSend));

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    findByUserId: function findByUserId(req, res) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var orderFromDB, orderToSend;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _RepairOrder2.default.find({ userId: req.params.id }, { nrZgloszenia: 1, modelMarka: 1, status: 1, createdAt: 1 }, { sort: { '_id': -1 } });

                        case 2:
                            orderFromDB = _context3.sent;

                            if (orderFromDB) {
                                _context3.next = 5;
                                break;
                            }

                            return _context3.abrupt('return', next());

                        case 5:
                            orderToSend = [];


                            orderFromDB.map(function (item) {
                                var date = new Date(item.createdAt);

                                orderToSend.push({
                                    id: item._id,
                                    nrZgloszenia: item.nrZgloszenia,
                                    modelMarka: item.modelMarka,
                                    status: item.status,
                                    dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                                });
                            });

                            return _context3.abrupt('return', res.status(200).send(orderToSend));

                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    zleceniaCount: function zleceniaCount(req, res) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var startOfCurrentMonth, startOfNextMonth, countThisMonth, countLastMonth;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            startOfCurrentMonth = new Date();

                            startOfCurrentMonth.setDate(1);
                            startOfNextMonth = new Date();

                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
                            _context4.prev = 5;
                            _context4.next = 8;
                            return _RepairOrder2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            }).count();

                        case 8:
                            countThisMonth = _context4.sent;


                            startOfCurrentMonth = new Date();
                            startOfCurrentMonth.setDate(1);
                            startOfCurrentMonth.setMonth(startOfCurrentMonth.getMonth() - 1);
                            startOfNextMonth = new Date();
                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth());

                            _context4.next = 17;
                            return _RepairOrder2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            }).count();

                        case 17:
                            countLastMonth = _context4.sent;
                            _context4.next = 23;
                            break;

                        case 20:
                            _context4.prev = 20;
                            _context4.t0 = _context4['catch'](5);
                            return _context4.abrupt('return', res.status(500).send(_context4.t0.message));

                        case 23:
                            return _context4.abrupt('return', res.status(200).send({ countThisMonth: countThisMonth, countLastMonth: countLastMonth }));

                        case 24:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[5, 20]]);
        }))();
    },
    zleceniaDochodSum: function zleceniaDochodSum(req, res) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var startOfCurrentMonth, startOfNextMonth, zleceniaThisMonth, zleceniaLastMonth, dochodThisMonth, dochodLastMonth;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            startOfCurrentMonth = new Date();

                            startOfCurrentMonth.setDate(1);
                            startOfNextMonth = new Date();

                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
                            dochodThisMonth = 0;
                            dochodLastMonth = 0;
                            _context5.prev = 7;
                            _context5.next = 10;
                            return _RepairOrder2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            });

                        case 10:
                            zleceniaThisMonth = _context5.sent;


                            zleceniaThisMonth.map(function (item) {
                                dochodThisMonth += parseFloat(item.dokumentacjaSerwisowa.cenaSuma);
                            });

                            startOfCurrentMonth = new Date();
                            startOfCurrentMonth.setDate(1);
                            startOfCurrentMonth.setMonth(startOfCurrentMonth.getMonth() - 1);
                            startOfNextMonth = new Date();
                            startOfNextMonth.setDate(1);
                            startOfNextMonth.setMonth(startOfNextMonth.getMonth());

                            _context5.next = 20;
                            return _RepairOrder2.default.find({
                                createdAt: {
                                    $gte: startOfCurrentMonth,
                                    $lt: startOfNextMonth
                                }
                            });

                        case 20:
                            zleceniaLastMonth = _context5.sent;


                            zleceniaLastMonth.map(function (item) {
                                dochodLastMonth += parseFloat(item.dokumentacjaSerwisowa.cenaSuma);
                            });
                            _context5.next = 27;
                            break;

                        case 24:
                            _context5.prev = 24;
                            _context5.t0 = _context5['catch'](7);
                            return _context5.abrupt('return', res.status(500).send(_context5.t0.message));

                        case 27:
                            return _context5.abrupt('return', res.status(200).send({ dochodThisMonth: dochodThisMonth, dochodLastMonth: dochodLastMonth }));

                        case 28:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[7, 24]]);
        }))();
    },
    create: function create(req, res) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var _req$body, typUrzadzenia, modelMarka, imeiNrSeryjny, uslugi, opisProblemu, trybZgloszenia, daneKontaktowe, dostawa, zgodaRegulamin, zgodaPrzetwarzanie, zgodaMarketing, userId, isUser, lastOrder, actualYear, nrZgloszenia, lastNumber, zgloszenie, name, uslugiParse, date;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _req$body = req.body, typUrzadzenia = _req$body.typUrzadzenia, modelMarka = _req$body.modelMarka, imeiNrSeryjny = _req$body.imeiNrSeryjny, uslugi = _req$body.uslugi, opisProblemu = _req$body.opisProblemu, trybZgloszenia = _req$body.trybZgloszenia, daneKontaktowe = _req$body.daneKontaktowe, dostawa = _req$body.dostawa, zgodaRegulamin = _req$body.zgodaRegulamin, zgodaPrzetwarzanie = _req$body.zgodaPrzetwarzanie, zgodaMarketing = _req$body.zgodaMarketing, userId = _req$body.userId;
                            _context6.next = 3;
                            return _User2.default.findOne({ email: daneKontaktowe.email });

                        case 3:
                            isUser = _context6.sent;

                            if (!(isUser && trybZgloszenia === 'gosc')) {
                                _context6.next = 6;
                                break;
                            }

                            return _context6.abrupt('return', res.sendStatus(409));

                        case 6:
                            _context6.next = 8;
                            return _RepairOrder2.default.find({}).sort([['_id', -1]]).limit(1);

                        case 8:
                            lastOrder = _context6.sent;


                            if (lastOrder.length === 0) {
                                lastOrder = [{ nrZgloszenia: undefined }];
                            }

                            actualYear = new Date().getFullYear();
                            nrZgloszenia = "";
                            lastNumber = 1;


                            if (lastOrder[0].nrZgloszenia !== undefined) {
                                lastNumber = parseInt(lastOrder[0].nrZgloszenia.split('/')[1]) + 1;
                                nrZgloszenia = "MS/" + lastNumber + "/" + actualYear;
                            } else {
                                nrZgloszenia = "MS/1/" + actualYear;
                            }

                            _context6.prev = 14;
                            _context6.next = 17;
                            return _RepairOrder2.default.create({
                                "nrZgloszenia": nrZgloszenia,
                                "typUrzadzenia": typUrzadzenia.value,
                                "modelMarka": modelMarka,
                                "imeiNrSeryjny": imeiNrSeryjny,
                                "zamowioneUslugi": uslugi,
                                "opisProblemu": opisProblemu,
                                "trybZgloszenia": trybZgloszenia,
                                "daneKontaktowe": daneKontaktowe,
                                "metodaDostawy": dostawa,
                                "zgodaRegulamin": zgodaRegulamin,
                                "zgodaPrzetwarzanie": zgodaPrzetwarzanie,
                                "zgodaMarketing": zgodaMarketing,
                                "status": "Oczekiwanie na dostawę",
                                "dokumentacjaSerwisowa": {
                                    "opis": "",
                                    "wykonaneUslugi": [],
                                    "czesci": [],
                                    "cenaSuma": 0.0
                                },
                                "userId": userId
                            });

                        case 17:
                            zgloszenie = _context6.sent;


                            if (trybZgloszenia === 'gosc') {
                                name = daneKontaktowe.imie;
                            } else {
                                name = isUser.nazwaUzytkownika;
                            }

                            uslugiParse = [];


                            uslugi.map(function (item) {
                                uslugiParse.push(item.label);
                            });

                            date = new Date(zgloszenie.createdAt);


                            zgloszenieNotify({
                                to: daneKontaktowe.email,
                                name: name,
                                id: zgloszenie.nrZgloszenia,
                                modelMarka: modelMarka,
                                status: "Oczekiwanie na dostawę",
                                uslugi: uslugiParse,
                                dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                            });

                            _context6.next = 25;
                            return _SentEmails2.default.create({ adresat: daneKontaktowe.email, typWiadomosci: 'Potwierdzenie złożenia zamówienia' });

                        case 25:

                            res.status(201).json({ 'success': 'New order created!' });
                            _context6.next = 32;
                            break;

                        case 28:
                            _context6.prev = 28;
                            _context6.t0 = _context6['catch'](14);

                            console.log(_context6.t0.message);
                            res.status(500).json({ 'message': _context6.t0.message });

                        case 32:
                            return _context6.abrupt('return', res.status(201).send());

                        case 33:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6, [[14, 28]]);
        }))();
    },
    updateDaneZgloszenia: function updateDaneZgloszenia(req, res, next) {
        var _this7 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var updatedZgloszenie;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            // pobranie przesłanych wartości i sprawdzenie poprawności
                            updatedZgloszenie = req.body.updatedZgloszenie;
                            _context7.prev = 1;
                            _context7.next = 4;
                            return _RepairOrder2.default.findOneAndUpdate({ _id: req.params.id }, updatedZgloszenie);

                        case 4:

                            res.status(201).json({ 'success': 'Order was edited!' });
                            _context7.next = 11;
                            break;

                        case 7:
                            _context7.prev = 7;
                            _context7.t0 = _context7['catch'](1);

                            console.log(_context7.t0.message);
                            res.status(500).json({ 'message': _context7.t0.message });

                        case 11:
                            return _context7.abrupt('return', res.status(201).send());

                        case 12:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7, [[1, 7]]);
        }))();
    },
    updateDokumentSerwisowy: function updateDokumentSerwisowy(req, res, next) {
        var _this8 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var _req$body2, status, dokumentSerwisowy, order, uslugi;

            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _req$body2 = req.body, status = _req$body2.status, dokumentSerwisowy = _req$body2.dokumentSerwisowy;
                            _context8.prev = 1;
                            _context8.next = 4;
                            return _RepairOrder2.default.findOneAndUpdate({ _id: req.params.id }, { "status": status, "dokumentacjaSerwisowa": dokumentSerwisowy });

                        case 4:
                            order = _context8.sent;

                            if (!(status === 'Zrealizowano')) {
                                _context8.next = 12;
                                break;
                            }

                            uslugi = [];

                            dokumentSerwisowy.wykonaneUslugi.map(function (item) {
                                uslugi.push({ nazwaUslugi: item.nazwa, ilosc: item.roboczogodziny, cena: item.cena });
                            });
                            dokumentSerwisowy.czesci.map(function (item) {
                                uslugi.push({ nazwaUslugi: item.nazwa, ilosc: item.ilosc, cena: item.cena });
                            });

                            podsumowanieNotify({
                                to: order.daneKontaktowe.email,
                                nrZgloszenia: order.nrZgloszenia,
                                name: order.daneKontaktowe.imie,
                                cena: dokumentSerwisowy.cenaSuma,
                                uslugi: uslugi,
                                opis: dokumentSerwisowy.opis
                            });

                            _context8.next = 12;
                            return _SentEmails2.default.create({ adresat: order.daneKontaktowe.email, typWiadomosci: 'Podsumowanie naprawy' });

                        case 12:

                            res.status(201).json({ 'success': 'Service document was edited!' });
                            _context8.next = 19;
                            break;

                        case 15:
                            _context8.prev = 15;
                            _context8.t0 = _context8['catch'](1);

                            console.log(_context8.t0.message);
                            res.status(500).json({ 'message': _context8.t0.message });

                        case 19:
                            return _context8.abrupt('return', res.status(201).send());

                        case 20:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8, [[1, 15]]);
        }))();
    },
    updateStatusZgloszenia: function updateStatusZgloszenia(req, res, next) {
        var _this9 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var status, order;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            status = req.body.status;
                            _context9.prev = 1;
                            _context9.next = 4;
                            return _RepairOrder2.default.findOneAndUpdate({ _id: req.params.id }, { status: status });

                        case 4:
                            order = _context9.sent;


                            zmianaStatusuNotify({
                                to: order.daneKontaktowe.email,
                                name: order.daneKontaktowe.imie,
                                nrZgloszenia: order.nrZgloszenia,
                                status: "W trakcie naprawy"
                            });

                            _context9.next = 8;
                            return _SentEmails2.default.create({ adresat: order.daneKontaktowe.email, typWiadomosci: 'Zmiana statusu zgłoszenia' });

                        case 8:

                            res.status(201).json({ 'success': 'Service document was edited!' });
                            _context9.next = 15;
                            break;

                        case 11:
                            _context9.prev = 11;
                            _context9.t0 = _context9['catch'](1);

                            console.log(_context9.t0.message);
                            res.status(500).json({ 'message': _context9.t0.message });

                        case 15:
                            return _context9.abrupt('return', res.status(201).send());

                        case 16:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9, [[1, 11]]);
        }))();
    },
    remove: function remove(req, res, next) {
        var _this10 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var order;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return _RepairOrder2.default.findOneAndRemove({ '_id': req.params.id });

                        case 2:
                            order = _context10.sent;

                            if (order) {
                                _context10.next = 5;
                                break;
                            }

                            return _context10.abrupt('return', next());

                        case 5:
                            return _context10.abrupt('return', res.status(200).send({ message: 'Order was removed' }));

                        case 6:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10);
        }))();
    }
};