module.exports = function(app, teams, users) {
  app.post('/teams', function(req, res) {
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
            throw err;
          }

          res.status(200).json({
            team: team,
            message: 'Team successfully created!'
          });
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
