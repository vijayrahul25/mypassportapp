/* MONGOOSE SETUP */
const mongoose = require('mongoose');
const uri = "mongodb://admin:admin123@localhost/admin";

mongoose.connect(uri, { useNewUrlParser: true, dbName: 'MyDatabase' }).then(function(result) {
  console.log('connection established');
}).catch(function(error) {
  console.log('error connecting database: ', error);
})

const Schema = mongoose.Schema;
const UserDetailSchema = new Schema({
      username: String,
      password: String
    });
    
const UserDetails = mongoose.model('userInfo', UserDetailSchema, 'userInfo');
module.exports = UserDetails;

