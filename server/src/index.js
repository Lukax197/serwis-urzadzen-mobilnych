import express from 'express';
import { join } from 'path';
import config from './config/config';
import { notFound, catchErrors } from './middlewares/errors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import dbConfig from './config/database';
import mongoose from 'mongoose';
import auth from './routes/auth';
import services from './routes/services';
import users from './routes/user';
import sentEmails from './routes/sentEmails'
import repairOrders from './routes/repairOrders'
import devices from './routes/devices'
const createAdmin = require('./scripts/createAdmin')

const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/corsOptions');
const cors = require('cors');

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

dotenv.config()

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(cookieParser())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', auth())
app.use('/api/uslugi', services())
app.use('/api/users', users())
app.use('/api/emails', sentEmails())
app.use('/api/zgloszenia', repairOrders())
app.use('/api/urzadzenia', devices())

app.use(notFound);
app.use(catchErrors);

createAdmin()

app.listen(config.server.port, () => {
    console.log(`Server is up!`);
});