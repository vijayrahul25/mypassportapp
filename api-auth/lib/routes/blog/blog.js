const post_controler = require('./post_controler');

module.exports = function(express, passport) {     
    var blogRouter = express.Router();
    const authenticate = require('./../../authenticate')(passport);

    blogRouter.get('/post', authenticate, (req, res) => {           
        return res.status(200).send({ message: "welcome to my blog category!" });
    }); 

    blogRouter.get('/post/all', authenticate, post_controler.getAllPost); 
    blogRouter.get('/post/top', authenticate, post_controler.getTopPost); 
    blogRouter.post('/post', authenticate, post_controler.newPost); 

    return blogRouter;    
}