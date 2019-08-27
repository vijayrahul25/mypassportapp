var express = require('express');
var app = express();
var router = require('express').Router();

var test =  require('./routes/test')(router);
var users =  require('./routes/users')(router);

app.use('/api', test);
app.use('/api/users', users)

app.use(function(req, res, next) {
    return res.status(404).send({ 'message': 'Route'+req.url+' Not found.' });
});
app.listen('3000');