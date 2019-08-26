module.exports = function(express, passport) { 
    var router = express.Router();

    router.use(function logallrequest (req, res, next) {
      console.log('---------------');
      console.log('Rahul Request URL:', req.originalUrl);     
    /*
    app.locals :  Once set, the value of app.locals properties persist throughout the life of the application
     res.locals : properties that are valid only for the lifetime of the request.
    */ 
   
   //console.log('flash', req.flash('info'));
   //var t = req.flash('info');
   //console.log('res  ',  t );
    res.locals.loggedin = false;
    res.locals.username = false;
    res.locals.error = {}
    res.locals.success = {}
    res.locals.error.message = req.flash('error_message');
    res.locals.success.message = req.flash('success_message');
    
      if(req.user){
        res.locals.loggedin = true;
        res.locals.username = req.user.username; 
        res.locals.userid = req.user._id;         
      };
      next()
    })

    router.get('/', (req, res) => {           
        res.render('index', { root : './'});
    }); 

    router.get('/login', (req, res) => {
         if(req.user) {
          return res.redirect('/');   
         }                       
         res.render('login', { root : './'}); 
    }); 

    router.get('/signup', (req, res) => {
        if(req.user) {
          return res.redirect('/');   
        }
        res.render('signup', { root : './'})
      }
    );      
    router.get('/error', (req, res) => res.send("error logging in"));

    router.get('/protected-1', checkLogedIn,  function (req, res) {
        res.render('protected', { root : './', pagename: 'page 1'}); 
    })

    router.get('/protected-2', checkLogedIn, function (req, res) {
      res.render('protected', { root : './', pagename: 'page 2'}); 
    })
    
    router.post('/login', function(req, res, next) {  
        passport.authenticate('login-strategy', function(err, user, info) {    
           //console.log(req.flash('error_message'))
          if (err) { return res.redirect('/login'); }

          if (!user) { return res.redirect('/login'); }

           /* save to session */
          req.logIn(user, function(err) {
            if (err) return next(err);                                 
            return res.redirect('/');
          });
          
        })(req, res, next);
      });

    router.post('/signup', function(req, res, next) {
        passport.authenticate('signup-strategy', function(err, user, info) {   
          console.log('signuproute: ', err);         
          console.log('signupuser: ', user);  
          if (err) { return res.redirect('/signup'); }

          if (!user) { return res.redirect('/signup'); }
          
          return res.redirect('/');
        })(req, res, next);
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

      router.use(function(req, res, next) {
        return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
      });
    
    return router; 
};

function checkLogedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/login');
}