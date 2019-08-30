/* eslint-disable strict */
// const validatorapi = require('validator');
const mongoose = require('./../db');

const Schema = mongoose.Schema;
const postSchema = new Schema({
	title: {
		type: String,
		minlength: 3,
		trim: true,
		required: true,
	},

	content: {
		type: String,
		minlength: 3,
		trim: true,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	upvote: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	],
	downvote: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	],
});


const post = mongoose.model('post', postSchema);
module.exports = post;
