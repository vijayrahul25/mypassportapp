const UserDetails = require('./db');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
  
    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user) {
        cb(err, user);
        });
    });

    passport.use('login-strategy', new LocalStrategy(
        function(username, password, done) {
            UserDetails.findOne({
            username: username
            }, function(err, user) {
                if (err) {            
                    return done(err);
                }
        
                if (!user) {
                    return done(null, false);
                }
        
                if (user.password != password) {
                    return done(null, false);
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
                    return done(err);
                }
        
                if (user) {
                    return done(null, false);
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