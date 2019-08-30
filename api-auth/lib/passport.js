/* eslint-disable strict */
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const config = require('./../conig/config');

module.exports = function (passport) {
	const authController = require('./authenticate')(passport);
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

	// Old Way to Create startegy
	// passport.use('login-strategy', new LocalStrategy(
	// 	function (username, password, done) {
	// 		User.findOne({
	// 			username: username,
	// 		}, async function (err, user) {
	// 			if (err) {
	// 				console.log('login strategy error: ', err);
	// 				return done({ message: 'internal error' }, false);
	// 			}

	// 			if (!user) {
	// 				return done({ message: 'User not founds' }, false);
	// 			}

	// 			const isMatch = await bcrypt.compare(password, user.password);
	// 			console.log(isMatch);
	// 			if (!isMatch) {
	// 				return done({ message: 'Invalid Credential' }, false);
	// 			}

	// 			return done(null, user);
	// 		});
	// 	}
	// ));

	// Old nesty way to create strategy
	// passport.use('signup-strategy', new LocalStrategy(
	// 	function (username, password, done) {
	// 		User.findOne({
	// 			username: username,
	// 		}, function (err, user) {
	// 			if (err) {
	// 				console.log('signup strategy error: ', err);
	// 				return done({ message: 'internal error' }, false);
	// 			}

	// 			if (user) {
	// 				return done({ message: 'User already exist' }, false);
	// 			}

	// 			var newUser = new User();
	// 			newUser.username = username;
	// 			newUser.password = password;

	// 			newUser.save(function (err) {
	// 				if (err) {
	// 					console.log(err);
	// 					var errorMessage = 'Some Error';
	// 					if (err.name === 'ValidationError') {
	// 						errorMessage = getErrorMessage(err);
	// 					}
	// 					console.log(errorMessage);
	// 					return done({ message: errorMessage }, false);
	// 				}
	// 				return done(null, newUser);
	// 			});
	// 		});
	// 	}
	// ));

	// old jwt startegy passport
	// passport.use(new JWTStrategy({
	// 	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	// 	secretOrKey: 'myjwtsession',
	// },
	// function (jwtPayload, done) {
	// 	return User.findOne({ _id: jwtPayload._id }, { username: 1 })
	// 		.then((user) => done(null, user))
	// 		.catch((err) => {
	// 			console.log('jwt error: ', err);
	// 			console.log('jwtid', jwtPayload);
	// 			return done({ message: 'internal error' }, false);
	// 		});
	// }
	// ));

	// login strategy by async await
	passport.use('login-strategy', new LocalStrategy(authController.loginStrategy));

	// signup strategy by async await
	passport.use('signup-strategy', new LocalStrategy(authController.signupStrategy));

	passport.use(new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.secret,
		}, authController.JsonStrategy));
};
