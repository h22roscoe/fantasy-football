var express = require('express');

var User = require('./models/user');
var Player = require('./models/player');
var Team = require('./models/team');

var route = require('./routes');

api = express.Router();

api.get('/createteam', route.isLoggedIn, function(req, res) {
  // Holy fuck that WILT score - TODO: Refactor this method into more methods.
  // TODO: Also handle the thrown errors within a try catch.
  var players = {};

  Player.find({
    position: 'Goalkeeper'
  }, function(err, keepers) {
    if (err) {
      throw err;
    }

    players.goalkeepers = keepers;

    Player.find({
      position: 'Defender'
    }, function(err, defenders) {
      if (err) {
        throw err;
      }

      players.defenders = defenders;

      Player.find({
        position: 'Midfielder'
      }, function(err, midfielders) {
        if (err) {
          throw err;
        }

        players.midfielders = midfielders;

        Player.find({
          position: 'Attacker'
        }, function(err, attackers) {
          if (err) {
            throw err;
          }

          players.attackers = attackers;

          Player.find({}, function(err, substitutes) {
            if (err) {
              throw err;
            }

            players.substitutes = substitutes;

            res.render('createteam', {
              players: players
            });
          });
        });
      });
    });
  });
})

api.post('/player', route.isLoggedIn, function(req, res) {
  try {
    User.findOne({
      username: req.user.username
    }, function(err, user) {
      if (err) {
        throw err;
      }

      var newPlayer = new Player();
      newPlayer.user = user;
      newPlayer.teams = [];
      newPlayer.name = req.body.player.firstname + " " + req.body.player.surname;
      newPlayer.position = req.body.player.position;
      newPlayer.xi = parseInt(req.body.player.xi);
      newPlayer.appearances = 0;
      newPlayer.goals = 0;
      newPlayer.assists = 0;
      newPlayer.cleansheets = 0;
      newPlayer.motms = 0;
      newPlayer.points = 0;
      newPlayer.yellowcards = 0;
      newPlayer.redcards = 0;

      newPlayer.save(function(err) {
        if (err) {
          throw err;
        }

        user.player = newPlayer;

        user.save(function(err) {
          if (err) {
            throw err;
          }

          res.redirect('/profile');
        });
      });
    });
  } catch(e) {
    res.sendStatus(500);
  }
});

module.exports = api;
