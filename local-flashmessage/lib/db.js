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

const Schema = mongoose.Schema;
const UserDetailSchema = new Schema({
      username:  {
        type: String,
        minlength: 3,
        trim: true,
        required: true,
      },
        
      password:  {
        type: String,
        minlength: 3,
        trim: true,
        required: true,
      //   validate: {
      //     validator: function(v) {
      //       return validatorapi.isEmpty(v);
      //     },
      //     message: props => { console.log('password', validatorapi.isEmpty(props.value)); return 'Empty passord' }
      //   } 
      }
    });
    UserDetailSchema.pre('save', async function (next) {
      const user = this
  
      if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
      }
  
      next()
    })
    
const UserDetails = mongoose.model('user', UserDetailSchema);
module.exports = UserDetails;

