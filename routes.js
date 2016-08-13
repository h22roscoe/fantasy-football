module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
  })

  // Process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });

  // Process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
