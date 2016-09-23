var express = require('express');

var User = require('../models/player');
var users = require('./controller')(User);
var Team = require('../models/team');
var teams = require('./controller')(Team);

var router = express.Router();

router.post('/', function(req, res) {
  var name = req.body.name;
  var formation = req.body.formation;
  var newTeam = teams.create(name, formation);
  newTeam.save(function(err) {
    if (err) {
      res.status(500).json({
        err: 'Server error when saving the new team'
      });
    }

    res.status(200).json({
      team: newTeam
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
