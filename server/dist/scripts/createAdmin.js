'use strict';

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createAdmin = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var admin;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _User2.default.findOne({ roles: { User: 2001, Admin: 2002 } });

                    case 2:
                        admin = _context.sent;

                        if (!(admin == null)) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 6;
                        return _User2.default.create({
                            "nazwaUzytkownika": 'admin',
                            "email": process.env.EMAIL,
                            "password": process.env.ADMIN_PASSWORD,
                            "daneOsobowe": {
                                imie: '',
                                nazwisko: '',
                                adres: '',
                                kodPocztowy: '',
                                miasto: '',
                                nrTelefonu: ''
                            },
                            "roles": {
                                User: 2001,
                                Admin: 2002
                            }
                        });

                    case 6:
                        console.log("Pomyślnie utworzono konto administratora!");

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createAdmin() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = createAdmin;