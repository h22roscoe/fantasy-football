var LocalStrategy = require('passport-local').Strategy;

// Load up the user model
var User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
