/* eslint-disable strict */
const post_controler = require('./post_controler');

module.exports = function (express, passport) {
	var blogRouter = express.Router();
	const authController = require('./../../authenticate')(passport);

	blogRouter.get('/', authController.validateJsonToken, (req, res) => res.status(200).send({ message: 'welcome to my blog category!' }));

	blogRouter.get('/post/all', authController.validateJsonToken, post_controler.getAllPost);
	blogRouter.get('/post/top', authController.validateJsonToken, post_controler.getTopRatedPost);
	blogRouter.post('/post', authController.validateJsonToken, post_controler.newPost);
	blogRouter.post('/post/upvote', authController.validateJsonToken, post_controler.upvote);
	return blogRouter;
};
