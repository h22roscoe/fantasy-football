var teams = require('./controller');
var users = require('../users/controller');

module.exports = function(app) {
  app.post('/teams', function(req, res) {
    var promise = users.findByUsername(req.user.username);
    promise.then(function(user) {
      var newTeam = teams.createTeam(req, user);
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
