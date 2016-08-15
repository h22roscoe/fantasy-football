var teams = require('./teams');
var players = require('./players');

var Player = require('./models/player');

function configure(app, passport) {
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
    successRedirect : '/success',
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
    successRedirect: '/success',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/success', isLoggedIn, function(req, res) {
    var playerPromise = players.getPlayerByUserId(req.user._id);
    playerPromise.then(function(player) {
      if (player) {
        // Since home will display their player
        handleTeams(req, res, player);
      } else {
        // Else they need to create their player
        res.render('playernew');
      }
    })
  });

  app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.use('/teams', teams.router);
  app.use('/players', players.router);
};

function handleTeams(req, res, player) {
  var teamPromise = teams.getTeamByUserId(req.user._id);
  teamPromise.then(function(team) {
    if (team) {
      res.render('home', {
        player: player,
        team: team,
        user: req.user
      });
    } else {
      res.redirect('/teams/new'); // They need to create new team.
    }
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

module.exports = {
  configure: configure,
  isLoggedIn: isLoggedIn
}
