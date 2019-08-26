/* MONGOOSE SETUP */
const mongoose = require('mongoose');
const validatorapi = require('validator');
const bcrypt = require('bcryptjs');

const uri = "mongodb://admin:admin123@localhost/admin";

mongoose.connect(uri, { useNewUrlParser: true, dbName: 'MyDatabase' }).then(function(result) {
  console.log('connection established');
}).catch(function(error) {
  console.log('error connecting database: ', error);
})

module.exports = mongoose;
