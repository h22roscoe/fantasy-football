var players = require('./controller');
var users = require('../users/controller');

module.exports = function(app) {
  app.post('/players', function(req, res) {
    var promise = users.getUserByUsername(req.user.username);
    promise.then(function(user) {
      var name = req.body.firstname + ' ' + req.body.surname;
      var xi = req.body.xi;
      var position = req.body.position;
      var newPlayer = players.createPlayer(name, position, xi, user);

      newPlayer.save(function(err, player) {
        if (err) {
          throw err;
        }

        user.player = player;
        user.save(function(err) {
          if (err) {
            throw err;
          }

          res.redirect('/home');
        });
      });
    });
  });

  app.get('/players', function(req, res) {
    players.findAll().then(function(players) {
      res.json({
        players: players
      });
    });
  });

  app.get('/players/new', function(req, res) {
    res.render('playernew');
  });

  app.get('/players/:id', function(req, res) {
    players.findById(req.params.id).then(function(player) {
      res.json(player);
    });
  });

  app.get('/players/me', function(req, res) {
    var userPromise = users.findByUsername(req.user.username);
    userPromise().then(function(user) {
      var playerPromise = players.findByUserId(user._id);
      playerPromise().then(function(player) {
        res.json(player);
      });
    });
  });

  app.get('/players/goalkeepers', function(req, res) {
    players.findAllByPosition('Goalkeeper').then(function(goalkeepers) {
      res.json({
        players: goalkeepers
      });
    });
  });

  app.get('/players/defenders', function(req, res) {
    players.findAllByPosition('Defender').then(function(defenders) {
      res.json({
        players: defenders
      });
    });
  });

  app.get('/players/midfielders', function(req, res) {
    players.findAllByPosition('Midfielder').then(function(midfielders) {
      res.json({
        players: midfielders
      });
    });
  });

  app.get('/players/attackers', function(req, res) {
    players.findAllByPosition('Attacker').then(function(attackers) {
      res.json({
        players: attackers
      });
    });
  });
};
