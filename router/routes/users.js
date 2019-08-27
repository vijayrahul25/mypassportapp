module.exports = function(router) {
var router = require('express').Router();

router.get('/', function(req, res) {
     res.send('Users Index Page');
});

router.get('/list', function(req, res) {
     res.send('Users List Page');
});
return router; 
};