var LocalStrategy = require('passport-local').Strategy;

// Load up the user model
var User = require('../models/user');

module.exports = function(passport) {
  // Used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  }, signupUser));

  passport.use('local-login', new LocalStrategy({
    passReqToCallback : true
  }, loginUser));
};

// ==============
// HELPER METHODS
// ==============

function loginUser(req, username, password, done) {
  // Find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  User.findOne({
    'local.username': username
  }, function(err, user) {
    return handleLoginUserResult(err, user, req, password, done);
  });
}

function handleLoginUserResult(err, user, req, password, done) {
  if (err) {
    return done(err);
  }

  if (!user) {
    return done(null, false, req.flash('loginMessage', 'No user found.'));
  }

  if (!user.validPassword(password)) {
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
  }

  return done(null, user);
}

function signupUser(req, username, password, done) {
  // Asynchronous
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {
    User.findOne({
      'local.username':  username
    }, function(err, user) {
      return handleSignupUserResult(err, user, req, username, password, done);
    });
  });
}

function handleSignupUserResult(err, user, req, username, password, done) {
  if (err) {
    return done(err);
  }

  // Check to see if there's already a user with that username
  if (user) {
    return done(null, false, req.flash(
      'signupMessage',
      'That username is already taken.'
    ));
  } else {
    // If there is no user with that username create the user
    var newUser = new User();

    // Set the user's local credentials
    newUser.local.username = username;
    newUser.local.password = newUser.generateHash(password);

    // Save the user
    newUser.save(function(err) {
      if (err) {
        throw err;
      }

      return done(null, newUser);
    });
  }
}
