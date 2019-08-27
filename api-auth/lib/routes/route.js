module.exports = function(express, passport) { 
    var router = express.Router();

    const authenticate = require('./../authenticate')(passport);

    const jwt      = require('jsonwebtoken');


    router.get('/', (req, res) => {
        res.status(200).send({ message: "welcome !" });
    });     
    
    router.get('/protected-1', authenticate,  function (req, res) {
      res.status(200).send({ message: "page 1 !" });
    })

    router.get('/protected-2', authenticate, function (req, res) {
      res.status(200).send({ message: "page 2 !" });
    })
    
    router.post('/login', function(req, res, next) {  
      
        passport.authenticate('login-strategy', {session: false}, function(err, user) {              
          if (err) { return res.status(200).send({ message: err }); }
          
          if (!user) { return res.status(200).send({ message: 'user not found' }); }

          req.login(user, {session: false}, (err) => {
            if (err) { res.status(200).send({ message: err }); }
            let { _id, username} = user;
            
            const token = jwt.sign({ _id, username }, 'myjwtsession');
            respuser = {_id, username}
            return res.status(200).send({respuser, token});
        });

          
        })(req, res, next);
      });

    router.post('/signup', function(req, res, next) {      
        passport.authenticate('signup-strategy', {session: false}, function(err, user) {                           
         if (err) { return res.status(500).send( err ); }  
         
         if (!user) { return res.status(200).send({ 'message': 'user not registered' }); }
         
         return res.status(200).send({ message: "user registered !" });

        })(req, res, next);
    });

    // router.get('/logout', function(req, res) {
    //     req.logout();       
    // });    
    return router; 
};

