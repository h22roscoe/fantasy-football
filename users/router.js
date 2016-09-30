var express = require('express');

var User = require('../models/user');
var users = require('./controller')(User);

var Player = require('../models/player');
var players = require('../players/controller')(Player);

var Team = require('../models/team');
var teams = require('../teams/controller')(Team);

var router = express.Router();

router.get('/:id', function(req, res) {
  users.findById(req.params.id).then(function(user) {
    res.status(200).json({
      user: user
    });
  });
});

router.put('/add-team', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    if (!user.team) {
      user.team = req.body.id;
    }

    user.save(function(err, userWithTeam) {
      if (err) {
        res.status(500).json({
          err: 'Something went wrong when assigning the player his/her team'
        });
      } else {
        teams.findById(userWithTeam.team).then(function(team) {
          team.owner = userWithTeam;
          team.save(function(err) {
            if (err) {
              res.status(500).json({
                err: 'Something went wrong with team-owner relationship'
              });
            } else {
              res.status(200).json({
                user: userWithTeam
              });
            }
          });
        });
      }
    });
  });
});

router.put('/add-player', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    if (!user.player) {
      user.player = req.body.id;
    }

    user.save(function(err, userWithPlayer) {
      if (err) {
        res.status(500).json({
          err: 'Something went wrong when assigning the user his/her player'
        });
      } else {
        players.findById(userWithPlayer.player).then(function(player) {
          player.owner = userWithPlayer;
          player.save(function(err) {
            if (err) {
              res.status(500).json({
                err: 'Something went wrong with player-owner relationship'
              });
            } else {
              res.status(200).json({
                user: userWithPlayer
              });
            }
          });
        });
      }
    });
  });
});

module.exports = router;
