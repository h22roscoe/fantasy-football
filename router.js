var express = require('express');

var User = require('./models/user');
var users = require('./users/controller')(User);

module.exports = function(passport) {
  var router = express.Router();

  router.post('/register', function (req, res) {
    var username = req.body.username;
    var passwd = req.body.password;
    users.register(username, passwd, function (err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }

      passport.authenticate('local', {
        session: true
      })(req, res, function () {
        return res.status(200).json({
          user: user
        });
      });
    });
  });

  router.post('/login', passport.authenticate('local', {
    session: true
  }), function (req, res) {
    return res.status(200).json({
      user: req.user
    });
  });

  router.get('/logout', isLoggedIn, function (req, res) {
    req.logout();
    res.status(200).json({
      status: 'Logged out'
    });
  });

  router.post('/players/*', isAdmin);
  router.put('/players/*', isAdmin);
  router.use('/players', require('./players/router'));

  router.post('/teams/*', isAdmin);
  router.put('/teams/*', isAdmin);
  router.use('/teams', require('./teams/router'));

  router.post('/users/*', isLoggedIn);
  router.put('/users/*', isLoggedIn);
  router.use('/users', require('./users/router'));

  return router;
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      err: 'UnauthorizedError'
    });
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    users.findByUsername(req.user.username).then(function(user) {
      if (!user) {
        res.status(401).json({
          err: 'UnauthorizedError'
        });
      }

      if (user.admin) {
        next();
      } else {
        res.status(401).json({
          err: 'UnauthorizedError'
        });
      }
    });
  } else {
    res.status(401).json({
      err: 'UnauthorizedError'
    });
  }
}
