const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const authenticate = require('./middleware/authenticate');
const movies = require('./routes/movies');
const computers = require('./routes/computes');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const customers =require('./routes/customers');
const home = require('./routes/home');
mongoose.connect('mongodb://localhost/mainDB')
    .then(() => console.log('DB connected to mainDB app....'))
    .catch(err => console.error('could not connect to DB...'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/movies', movies)
app.use('/api/computers', computers);
app.use('/api/customers', customers);


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan called...');

};
dbDebugger('database connected...');

console.log(`app: ${app.get('env')}`);
console.log(`application name: ${config.get('name')}`);
console.log(`mail server: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));