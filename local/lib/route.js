module.exports = function(express, passport) { 
    var router = express.Router();

    router.get('/', (req, res) => res.sendFile('template/index.html', { root : './'})); 
    router.get('/login', (req, res) => res.sendFile('template/auth.html', { root : './'})); 
    router.get('/signup', (req, res) => res.sendFile('template/signup.html', { root : './'})); 
    router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));    
    router.get('/error', (req, res) => res.send("error logging in"));

    router.get('/about', function (req, res) {
        res.send('About this wiki');
    })

    // router.post('/login',
    //     passport.authenticate('login-strategy', { failureRedirect: '/error' }),
    //     function(req, res) {
    //         res.redirect('/success?username='+req.user.username);
    // }); 

    // router.post('/login', passport.authenticate('login-strategy', {        
	// 	successRedirect :  '/success' , // redirect to the secure profile section
	// 	failureRedirect : '/error', // redirect back to the signup page if there is an error		
    // }));
    
    router.post('/login', function(req, res, next) {
        passport.authenticate('login-strategy', function(err, user, info) {
            console.log(user);
          if (err) { return res.redirect('/error'); }

          if (!user) { return res.redirect('/error'); }

          return res.redirect('/success?username=' + user.username);
        })(req, res, next);
      });

    router.post('/singup', function(req, res, next) {
        passport.authenticate('signup-strategy', function(err, user, info) {
            console.log(user);
          if (err) { return res.redirect('/error'); }

          if (!user) { return res.redirect('/error'); }

          return res.redirect('/success?username=' + user.username);
        })(req, res, next);
      });

    router.use(function(req, res, next) {
        return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
      });
    
    return router; 
};