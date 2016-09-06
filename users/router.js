var express = require('express');

var User = require('../models/user');
var users = require('./controller')(User);

var router = express.Router();

router.post('/', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    var name = req.body.name;
    var position = req.body.position;
    var xi = req.body.xi;
    var userWithPlayer = users.addPlayer(user, name, position, xi);

    userWithPlayer.save(function(err, user) {
      if (err) {
        res.status(500).json({
          err: 'Some kind of error when saving user with player'
        });
      }

      res.status(200).json({
        user: user
      });
    });
  });
});

router.get('/', function(req, res) {
  users.findAll().then(function(players) {
    res.status(200).json({
      players: players
    });
  });
});

router.get('/me', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    res.json(user);
  });
});

router.get('/goalkeepers', function(req, res) {
  users.findAllByPosition('Goalkeeper').then(function(goalkeepers) {
    res.json({
      players: goalkeepers
    });
  });
});

router.get('/defenders', function(req, res) {
  users.findAllByPosition('Defender').then(function(defenders) {
    res.json({
      players: defenders
    });
  });
});

router.get('/midfielders', function(req, res) {
  users.findAllByPosition('Midfielder').then(function(midfielders) {
    res.json({
      players: midfielders
    });
  });
});

router.get('/attackers', function(req, res) {
  users.findAllByPosition('Attacker').then(function(attackers) {
    res.json({
      players: attackers
    });
  });
});

router.get('/:id', function(req, res) {
  users.findById(req.params.id).then(function(player) {
    res.json(player);
  });
});

module.exports = router;
