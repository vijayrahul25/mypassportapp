const User = require('./model/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

module.exports = function(passport) {

    // passport.serializeUser(function(user, cb) {  
    //     console.log('serialize: ', user)      
    //     cb(null, user.id);
    // });
  
    // passport.deserializeUser(function(id, cb) {   
    //     console.log('deserialize: ', id)           
    //     User.findById(id, function(err, user) {
    //     cb(err, user);
    //     });
    // });

    passport.use('login-strategy', new LocalStrategy(      
        function( username, password, done) {             
            User.findOne({
            username: username,
            }, async function(err, user) {                  
                if (err) {  
                    console.log('login strategy error: ', err)                                         ;
                    return done({'message': 'internal error'}, false);
                }
        
                if (!user) {        
                    return done({'message':  'User not founds'}, false);
                }
                
                const isMatch = await bcrypt.compare(password, user.password)
                console.log(isMatch);
                if (!isMatch) {
                    return done({'message':  'Invalid Credential'}, false);
                }
           
                return done(null, user);
            });
        }
    ));

    passport.use('signup-strategy', new LocalStrategy(
        {passReqToCallback : true},
        function(req, username, password, done) {            
            User.findOne({
            username: username,
            }, function(err, user) {                   
                if (err) {  
                    console.log('signup strategy error: ', err)                                         ;
                    return done({'message': 'internal error'}, false);
                }
        
                if (user) {        
                    return done({'message':  'User already exist'}, false );
                }
        
                var newUser = new User();
                newUser.username = username;
                newUser.password = password;
       
                newUser.save(function(err) {
                    if (err) {
                        console.log(err);
                        var errorMessage = 'aSome Error';
                        if (err.name == 'ValidationError') {
                            errorMessage = getErrorMessage(err);                            
                        }
                        console.log(errorMessage)
                        return done({'message':  errorMessage}, false );
                    }                        
                    return done(null, newUser);
                });       
            });
        }
    ));
    
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'myjwtsession'
        },
        function (jwtPayload, done) {       
            return User.findOne({_id:jwtPayload._id},{username:1})
                .then(user => {                    
                    return done(null, user);
                })
                .catch(err => {
                    console.log('jwt error: ', err)        
                    console.log('jwtid', jwtPayload)
                    return done({'message': 'internal error'}, false);
                });
        }
    ));
};

function getErrorMessage(err) {
    console.log(err)
    console.log('sdfsdf');
    var errormessage = '';
    Object.keys(err.errors).forEach(key => errormessage += err.errors[key].message);
    return errormessage;
}