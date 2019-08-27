module.exports = function () {
    var post = {};

    post.getAllPost = function (req, res) {  
        return res.status(200).send({ message: "welcome to all post" }); 
    };

    // Other stuff...
    post.getTopPost = function(req, res) {
        return res.status(200).send({ message: "welcome to top post" }); 
    };

    return post;
};