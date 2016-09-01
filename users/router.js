module.exports = function(app, users) {
  app.post('/players', function(req, res) {
    users.findByUsername(req.user.username).then(function(user) {
      var name = req.body.player.firstname + ' ' + req.body.player.surname;
      var xi = req.body.player.xi;
      var position = req.body.player.position;
      var userWithPlayer = users.addPlayer(user, name, position, xi);

      userWithPlayer.save(function(err, user) {
        if (err) {
          throw err;
        }

        res.status(200).json({
          message: 'Your player has been created!'
        });
      });
    });
  });

  app.get('/players', function(req, res) {
    users.findAll().then(function(players) {
      res.status(200).json({
        players: players
      });
    });
  });

  app.get('/players/me', function(req, res) {
    users.findByUsername(req.user.username).then(function(user) {
      res.json(user);
    });
  });

  app.get('/players/goalkeepers', function(req, res) {
    users.findAllByPosition('Goalkeeper').then(function(goalkeepers) {
      res.json({
        players: goalkeepers
      });
    });
  });

  app.get('/players/defenders', function(req, res) {
    users.findAllByPosition('Defender').then(function(defenders) {
      res.json({
        players: defenders
      });
    });
  });

  app.get('/players/midfielders', function(req, res) {
    users.findAllByPosition('Midfielder').then(function(midfielders) {
      res.json({
        players: midfielders
      });
    });
  });

  app.get('/players/attackers', function(req, res) {
    users.findAllByPosition('Attacker').then(function(attackers) {
      res.json({
        players: attackers
      });
    });
  });

  app.get('/players/:id', function(req, res) {
    users.findById(req.params.id).then(function(player) {
      res.json(player);
    });
  });

  // Does the same as the above route because they are one model
  // so just here for conveniece.
  app.get('/users/:id', function(req, res) {
    users.findById(req.params.id).then(function(user) {
      res.json(user);
    });
  });
};
