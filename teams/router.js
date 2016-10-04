var express = require('express');

var Team = require('../models/team');
var teams = require('./controller')(Team);

var router = express.Router();

router.post('/', function(req, res) {
  var name = req.body.name;
  var formation = req.body.formation;
  var gks = req.body.goalkeepers;
  var defs = req.body.defenders;
  var mids = req.body.midfielders;
  var atts = req.body.attackers;

  var newTeam = teams.create(name, formation, gks, defs, mids, atts);
  newTeam.save(function(err) {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        team: newTeam
      });
    }
  });
});

router.get('/', function(req, res) {
  teams.findAll().then(function(ts) {
    teams.gatherPoints();
    res.json(ts);
  });
});

router.get('/:id', function(req, res) {
  teams.findById(req.params.id).then(function(team) {
    teams.gatherPoints();
    res.json(team);
  });
});

module.exports = router;
