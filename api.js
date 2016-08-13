var express = require('express');

var User = require('./models/user');
var Player = require('./models/player');
var Team = require('./models/team');

var route = require('./routes');

api = express.Router();

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
      newPlayer.firstname = req.body.player.firstname;
      newPlayer.surname = req.body.player.surname;
      newPlayer.position = req.body.player.position;
      newPlayer.xi = parseInt(req.body.player.xi);
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
        });
      });

      res.redirect('/profile');
    });
  } catch(e) {
    res.sendStatus(500);
  }
});

module.exports = api;
