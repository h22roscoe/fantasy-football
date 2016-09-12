var express = require('express');

var User = require('../models/user');
var users = require('../users/controller')(User);
var Team = require('../models/team');
var teams = require('./controller')(Team);

var router = express.Router();

router.post('/', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    var newTeam = teams.createTeam(req.body, user);
    newTeam.save(function(err, team) {
      if (err) {
        res.status(500).json({
          err: 'Server error when saving the new team'
        });
      }

      user.team = team;
      user.save(function(err) {
        if (err) {
          res.status(500).json({
            err: 'Server error'
          });
        }

        res.status(200).json({
          team: team
        });
      });
    });
  });
});

router.get('/', function(req, res) {
  teams.findAll().then(function(teams) {
    res.json(teams);
  });
});

router.get('/:id', function(req, res) {
  teams.findById(req.params.id).then(function(team) {
    res.json(team);
  });
});

module.exports = router;
