const UserDetails = require('./db');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {        
        cb(null, user.id);
    });
  
    passport.deserializeUser(function(id, cb) {        
        UserDetails.findById(id, function(err, user) {
        cb(err, user);
        });
    });

    passport.use('login-strategy', new LocalStrategy(
        {passReqToCallback : true},
        function(req, username, password, done) {           
            UserDetails.findOne({
            username: username,
            }, async function(err, user) {                  
                if (err) {  
                    console.log(err)                           
                    return done(err, false, req.flash('error_message', 'some error'));
                }
        
                if (!user) {        
                    return done(null, false, req.flash('error_message', 'User not found'));
                }
                
                const isMatch = await bcrypt.compare(password, user.password)
                console.log(isMatch);
                if (!isMatch) {
                    return done(null, false, req.flash('error_message', 'Invalid Credential'));
                }
           
                return done(null, user);
            });
        }
    ));

    passport.use('signup-strategy', new LocalStrategy(
        {passReqToCallback : true},
        function(req, username, password, done) {            
            UserDetails.findOne({
            username: username,
            }, function(err, user) {                   
                if (err) {  
                    console.log(err)                           
                    return done(err, false, req.flash('error_message', 'some error'));
                }
        
                if (user) {        
                    return done(null, false, req.flash('error_message', 'User already exist'));
                }
        
                var newUser = new UserDetails();
                newUser.username = username;
                newUser.password = password;
       
                newUser.save(function(err) {
                    if (err) {
                        var errorMessage = 'Some Error';
                        if (err.name == 'ValidationError') {
                            errorMessage = getErrorMessage(err);                            
                        }
                        console.log(errorMessage)
                        return done(null, false, req.flash('error_message', errorMessage));
                    }                        
                    return done(null, newUser);
                });       
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