module.exports =  {
    getAllPost : function (req, res) {  
        return res.status(200).send({ message: "welcome to all post" }); 
    },

    // Other stuff...
    getTopPost : (req, res) => {
        return res.status(200).send({ message: "welcome to top post" }); 
    },
    newPost : (req, res) => {
        return res.status(200).send({ message: "welcome to top post" }); 
    }   
};