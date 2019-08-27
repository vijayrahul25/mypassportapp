
const mongoose = require('./../db');
const validatorapi = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const userchema = new Schema({
      title:  {
        type: String,
        minlength: 3,
        trim: true,
        required: true,
        unique:true
      },
        
      content:  {
        type: String,
        minlength: 3,
        trim: true,
        required: true,      
      },
      userid:  {
        type: ,
        minlength: 3,
        trim: true,
        required: true,      
      }
      
    });
    userchema.pre('save', async function (next) {
      const user = this
  
      if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
      }
  
      next()
    })
    
const user = mongoose.model('user', userchema);
module.exports = user;

