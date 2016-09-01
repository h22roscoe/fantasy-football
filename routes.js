var User = require('./models/user');
var usersCtrl = require('./users/controller')(User);
var Team = require('./models/team');
var teamsCtrl = require('./teams/controller');

module.exports = function(app, passport) {
  app.post('/register', function(req, res) {
    var username = req.body.username;
    var passwd = req.body.password;
    usersCtrl.registerUser(username, passwd, userRegisteredCb);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    return res.status(200).json({
      status: 'Login successful!'
    });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Logged out'
    });
  });

  require('./teams/router')(app, teamsCtrl, usersCtrl);

  require('./users/router')(app, usersCtrl);
};

function userRegisteredCb(err, user) {
  if (err) {
    return res.status(500).json({
      err: err
    });
  } else {
    return res.status(200).json({
      user: user
    });
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: 'UnauthorizedError'
  });
}
