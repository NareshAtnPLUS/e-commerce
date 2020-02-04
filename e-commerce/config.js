const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const exphbs = require('express-handlebars');

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=> {
    console.log('Connected to Database '+config.database);
});

mongoose.connection.on('error', (err)=> {
    console.log('Database error '+err);
});


const users = require('./endpoints/user');

const restApi = express();

restApi.use(cors());

// View Engine
restApi.set('views',path.join(__dirname,'views'));
restApi.engine('handlebars',exphbs());
restApi.set('view engine','handlebars');

restApi.use(express.static(path.join(__dirname,'client')));

restApi.use(bodyParser.json());
restApi.use(bodyParser.urlencoded({extended: false}));



//  Passport Initialization
restApi.use(passport.initialize());
restApi.use(passport.session());
require('./config/passport')(passport);

restApi.use('/users',users);

restApi.get('/',(req,res) => {
    res.send('Invalid Endpoint');
    //res.send('Invalid EndPoint')
    
});
restApi.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client/index.html'));
});


restApi.set('port', (process.env.PORT || 3000));

module.exports = { restApi };