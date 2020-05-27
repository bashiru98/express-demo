const startupDebugger = require('debug')('app:startup');
const dbDebugger =require('debug')('app:db');
const config =require('config');
const logger = require('./middleware/logger');
const morgan =require('morgan');
const helmet =require('helmet');
const authenticate =require('./middleware/authenticate');

const express = require('express');
const app = express();
const courses =require('./routes/courses');
const home =require('./routes/home');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);
app.use(helmet());
app.set('view engine', 'pug');
app.set('views','./views');
app.use('/api/courses',courses);
app.use('/',home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan called...');
    
}
dbDebugger('database connected...');

console.log(`app: ${app.get('env')}`);
console.log(`application name: ${config.get('name')}`);
console.log(`mail server: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));