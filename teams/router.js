var express = require('express');

var User = require('../models/user');
var users = require('../users/controller')(User);
var Team = require('../models/team');
var teams = require('./controller')(Team);

var router = express.Router();

router.post('/', function(req, res) {
  users.findByUsername(req.user.username).then(function(user) {
    var name = req.body.team.name;
    var formation = req.body.team.formation;
    var newTeam = teams.createTeam(name. formation, user);
    newTeam.save(function(err, team) {
      if (err) {
        throw err;
      }

      user.team = team;
      user.save(function(err) {
        if (err) {
          res.status(500).json({
            err: 'Server error'
          });
        }

        res.status(200).json({
          team: team,
          message: 'Team successfully created!'
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
