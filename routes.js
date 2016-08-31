var teamsRouter = require('./teams/router');
var playersRouter = require('./players/router');

var User = require('./models/user');

function configure(app, passport) {
  app.post('/register', function(req, res) {
    User.register(new User({
      username: req.body.username
    }), req.body.password, function(err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      } else {
        return res.status(200).json({
          user: user
        });
      }
    });
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

  teamsRouter(app);

  playersRouter(app);
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: 'UnauthorizedError'
  });
}

module.exports = {
  configure: configure
};
