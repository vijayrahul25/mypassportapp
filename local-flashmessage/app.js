/*  EXPRESS SETUP  */
const express = require('express');
const app = express();
const flash    = require('connect-flash');
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","ejs");

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */
const passport = require('passport');

app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./lib/passport')(passport);
    
var router = require('./lib/route')(express, passport);

app.use('/', router);