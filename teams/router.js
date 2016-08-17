var teams = require('./controller');
var users = require('../users/controller');

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
};
