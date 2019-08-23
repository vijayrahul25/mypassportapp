/*  EXPRESS SETUP  */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

require('./lib/passport')(passport);
    
var router = require('./lib/route')(express, passport);

app.use('/', router);