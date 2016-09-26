var express = require('express');

var Team = require('../models/team');
var teams = require('./controller')(Team);

var router = express.Router();

router.post('/', function(req, res) {
  var name = req.body.name;
  var formation = req.body.formation;
  var gks = req.body.goalkeepers.players;
  var defs = req.body.defenders.players;
  var mids = req.body.midfielders.players;
  var atts = req.body.attackers.players;

  var newTeam = teams.create(name, formation, gks, defs, mids, atts);
  newTeam.save(function(err) {
    if (err) {
      res.status(500).json({
        err: 'Server error when saving the new team'
      });
    } else {
      res.status(200).json({
        team: newTeam
      });
    }
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
