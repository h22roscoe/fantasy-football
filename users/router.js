var express = require('express');

var User = require('../models/user');
var users = require('./controller')(User);

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
    user.team = req.body.team;

    user.save(function(err) {
      if (err) {
        res.status(500).json({
          err: 'Something went wrong when assigning the player his/her team'
        });
      }

      res.status(200).json({
        user: user
      });
    });
  });
});
