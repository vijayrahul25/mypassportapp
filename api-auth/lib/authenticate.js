module.exports = function(passport) { 
    return passport.authenticate('jwt', {session: false})
}