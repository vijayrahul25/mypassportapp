/* eslint-disable strict */
const utill = require('./../../utill');
const Post = require('./../../model/post');
// const db = require('./../../db');
const getErrorMessage = require('./../../errorhandler');

module.exports = {
	async getAllPost(req, res) {
		// Populate is mongose default method which run two query
		// Post.find({})
		// 	.populate('author')
		// 	.exec((err, Posts) => {
		// 		if (err) {
		// 			return res.status(200).send({ message: 'error' });
		// 		}
		// 		return res.status(200).send({ Posts });
		// 	});

		await Post.aggregate([
			{
				$lookup:
      {
      	from: 'users', // this should be mongo collection name and not model name
      	localField: 'author',
      	foreignField: '_id',
      	as: 'author',
      },
			},
			{
				$project:
        {
        	'author.password': 0,
        },
			},
		]).exec((err, Posts) => {
       		if (err) {
       			return res.status(200).send({ message: 'error' });
			}
       		return res.status(200).send({ Posts });
      	});

		// return res.status(200).send({ message: 'error' });
	},

	// Other stuff...
	getTopRatedPost: (req, res) => res.status(200).send({ message: 'welcome to top post' }),
	newPost: (req, res) => {
		var post = new Post();

		// eslint-disable-next-line no-unused-expressions
		post.title = req.body.title;
		post.content = req.body.content;
		post.author = req.user._id;

		post.save((err) => {
			if (err) {
				let errorMessage = 'Some Error';
				if (err.name === 'ValidationError') {
					errorMessage = getErrorMessage(err);
				}
				console.log(errorMessage);
				return res.status(200).send({ message: errorMessage });
			}
			return res.status(200).send({ message: 'post saved', data: post });
		});
	},
	upvote: (req, res, next) => {
		try {
			if (!utill.isExist(req.body.postid)) {
			 throw new Error('postid not exist');
			}


			res.send({ message: 'done' });
		} catch (err) {
			next(err);
		}
	},
};
