var express = require('express');

var Player = require('../models/player');
var players = require('./controller')(Player);

var router = express.Router();

router.post('/', function(req, res) {
  var name = req.body.name;
  var position = req.body.position;
  var xi = req.body.xi;
  var player = players.create(name, position, xi);

  player.save(function(err) {
    if (err) {
      res.status(500).json({
        err: 'Some kind of error when saving user with player'
      });
    }

    res.status(200).json({
      player: player
    });
  });
});

router.put('/:id', function(req, res) {
  players.findById(req.params.id).then(function(player) {
    Object.keys(req.body).forEach(function(key) {
      player[key] = req.body[key];
    });

    player.save(function(err) {
      if (err) {
        res.status(500).json({
          err: 'Some kind of error when updating player'
        });
      }

      res.status(200).json({
        player: player
      });
    });
  });
});

router.get('/', function(req, res) {
  players.findAll().then(function(players) {
    res.status(200).json(players);
  });
});

router.get('/goalkeepers', function(req, res) {
  players.findAllByPosition('Goalkeeper').then(function(goalkeepers) {
    res.status(200).json(goalkeepers);
  });
});

router.get('/defenders', function(req, res) {
  players.findAllByPosition('Defender').then(function(defenders) {
    res.status(200).json(defenders);
  });
});

router.get('/midfielders', function(req, res) {
  players.findAllByPosition('Midfielder').then(function(midfielders) {
    res.status(200).json(midfielders);
  });
});

router.get('/attackers', function(req, res) {
  players.findAllByPosition('Attacker').then(function(attackers) {
    res.status(200).json(attackers);
  });
});

router.get('/:id', function(req, res) {
  players.findById(req.params.id).then(function(player) {
    res.status(200).json(player);
  });
});

module.exports = router;
