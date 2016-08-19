var teamsRouter = require('./teams/router');
var playersRouter = require('./players/router');

var User = require('./models/user');
var users = require('./users/controller')(User);

function configure(app, passport) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });

  // Process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });

  // Process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/home', isLoggedIn, function(req, res) {
    var promise = users.findByUsername(req.user.username);
    promise.then(function(user) {
      res.render('home', {
        user: user
      });
    });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.all('/teams/*', isLoggedIn);
  app.all('/teams', isLoggedIn);
  teamsRouter(app);

  app.all('/players/*', isLoggedIn);
  app.all('/players', isLoggedIn);
  playersRouter(app);
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

module.exports = {
  configure: configure
};
