var teams = require('./teams/router');
var players = require('./players/router');

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
    res.render('home', {
      user: req.user
    });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.all('/teams', isLoggedIn);
  teams(app);

  app.all('/players', isLoggedIn);
  players(app);
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
