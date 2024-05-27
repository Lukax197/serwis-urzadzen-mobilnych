'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _errors = require('./middlewares/errors');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _RepairOrder = require('./models/RepairOrder');

var _RepairOrder2 = _interopRequireDefault(_RepairOrder);

var _database = require('./config/database');

var _database2 = _interopRequireDefault(_database);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _songs = require('./routes/songs');

var _songs2 = _interopRequireDefault(_songs);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _services = require('./routes/services');

var _services2 = _interopRequireDefault(_services);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _sentEmails = require('./routes/sentEmails');

var _sentEmails2 = _interopRequireDefault(_sentEmails);

var _repairOrders = require('./routes/repairOrders');

var _repairOrders2 = _interopRequireDefault(_repairOrders);

var _devices = require('./routes/devices');

var _devices2 = _interopRequireDefault(_devices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var credentials = require('./middlewares/credentials');
var corsOptions = require('./config/corsOptions');
var cors = require('cors');
var createAdmin = require('./scripts/createAdmin');
var decrypt = require('./scripts/crypto');
// import register from 'babel-core/register';
// import babelPolyfill from 'babel-polyfill';


// Connect to database

// const authenticate = require('./middlewares/authenticate')

_mongoose2.default.connect(_database2.default.mongoUrl);
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connection.on('error', function (err) {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

_dotenv2.default.config();

var app = (0, _express2.default)();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.set('view engine', 'pug');
app.set('views', (0, _path.join)(__dirname, 'views'));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static('public'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/auth', (0, _auth2.default)());
// routes config
// app.use(authenticate);
app.use('/api/songs', (0, _songs2.default)());
app.use('/api/uslugi', (0, _services2.default)());
app.use('/api/users', (0, _user2.default)());
app.use('/api/emails', (0, _sentEmails2.default)());
app.use('/api/zgloszenia', (0, _repairOrders2.default)());
app.use('/api/urzadzenia', (0, _devices2.default)());

// errors handling
app.use(_errors.notFound);
app.use(_errors.catchErrors);

createAdmin();

// let's play!
app.listen(_config2.default.server.port, function () {
    console.log('Server is up!');
});