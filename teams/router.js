var Team = require('../models/team');
var teams = require('./controller')(Team);
var User = require('../models/user');
var users = require('../users/controller')(User);

module.exports = function(app) {
  app.post('/teams', function(req, res) {
    var promise = users.findByUsername(req.user.username);
    promise.then(function(user) {
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
            throw err;
          }

          res.redirect('/home');
        });
      });
    });
  });

  app.get('/teams', function(req, res) {
    teams.findAll().then(function(teams) {
      res.json(teams);
    });
  });

  app.get('/teams/:id', function(req, res) {
    teams.findById(req.params.id).then(function(team) {
      res.json(team);
    });
  });
};