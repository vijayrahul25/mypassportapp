/* eslint-disable strict */
// const validatorapi = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('./../db');

const Schema = mongoose.Schema;
const userchema = new Schema({
	username: {
		type: String,
		minlength: 3,
		trim: true,
		required: true,
		unique: true,
	},

	password: {
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
	},

});
userchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const user = mongoose.model('user', userchema);
module.exports = user;
