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

router.put('/:id', function(req, res) {
  users.findById(req.params.id).then(function(user) {
    Object.keys(req.body).forEach(function(key) {
      user[key] = req.body[key];
    });

    user.save(function(err, user) {
      if (err) {
        res.status(500).json({
          err: 'Some kind of error when updating user'
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
    res.status(200).json(players);
  });
});

router.get('/me', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    res.status(200).json(user);
  });
});

router.get('/goalkeepers', function(req, res) {
  users.findAllByPosition('Goalkeeper').then(function(goalkeepers) {
    res.status(200).json(goalkeepers);
  });
});

router.get('/defenders', function(req, res) {
  users.findAllByPosition('Defender').then(function(defenders) {
    res.status(200).json(defenders);
  });
});

router.get('/midfielders', function(req, res) {
  users.findAllByPosition('Midfielder').then(function(midfielders) {
    res.status(200).json(midfielders);
  });
});

router.get('/attackers', function(req, res) {
  users.findAllByPosition('Attacker').then(function(attackers) {
    res.status(200).json(attackers);
  });
});

router.get('/:id', function(req, res) {
  users.findById(req.params.id).then(function(player) {
    res.status(200).json(player);
  });
});

module.exports = router;
