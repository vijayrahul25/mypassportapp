/*  EXPRESS SETUP  */
const express = require('express');
const app = express();
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

//app.set('view engine', 'pug');

const port = process.env.PORT || 3000; 
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */
const passport = require('passport');


require('./lib/passport')(passport);

var index = require('./lib/routes/route')(express, passport);
var blog = require('./lib/routes/blog/blog')(express, passport);

app.use('/api', index);
app.use('/api/blog', blog);

app.use(function(req, res, next) {
    return res.status(404).send({ 'message': 'Route'+req.url+' Not found.' });
});

// error handler
app.use(function(err, req, res, next) {
    res.send('err.message');
});