var express = require('express');

var User = require('./models/user');
var usersCtrl = require('./users/controller')(User);

module.exports = function(passport) {
  var router = express.Router();

  router.post('/register', function(req, res) {
    var username = req.body.username;
    var passwd = req.body.password;
    usersCtrl.registerUser(username, passwd, function(err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }

      passport.authenticate('local', {
        session: true
      })(req, res, function() {
        return res.status(200).json({
          status: 'Registration successful!'
        });
      });
    });
  });

  router.post('/login', passport.authenticate('local', {
    session: true
  }), function(req, res) {
    return res.status(200).json({
      user: req.user
    });
  });

  router.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Logged out'
    });
  });

  router.all('/players/*', isLoggedIn);
  router.all('/players', isLoggedIn);
  router.use('/players', require('./users/router'));

  router.all('/teams/*', isLoggedIn);
  router.all('/teams', isLoggedIn);
  router.use('/teams', require('./teams/router'));

  return router;
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: 'UnauthorizedError'
  });
}
