const UserDetails = require('./db');
const LocalStrategy = require('passport-local').Strategy;

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
            }, function(err, user) {  
                console.log('something');
                if (err) {  
                    console.log(err)                          
                    return done(err, false, req.flash('error_message', 'some error'));
                }
        
                if (!user) {        
                    return done(null, false, req.flash('error_message', 'User not found'));
                }
        
                if (user.password != password) {
                    
                    return done(null, false, req.flash('error_message', 'Invalid Credential'));
                }
                
                return done(null, user);
            });
        }
    ));

    passport.use('signup-strategy', new LocalStrategy(
        function(username, password, done) {
            UserDetails.findOne({
            username: username
            }, function(err, user) {
                if (err) {            
                    return done(err, false, req.flash('error_message', 'some error'));
                }
        
                if (user) {
                    return done(null, false, req.flash('error_message', 'User already exist'));
                }

                var newUser = new UserDetails();
                newUser.username = username;
                newUser.password = password;

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            });
        }
    ));
};