var express = require('express');
var players = require('./players');

var Team = require('./models/team');

router = express.Router();

router.post('/', function(req, res) {
  var promise = users.getUserById(req.user._id);
  promise.then(function(user) {
    var newTeam = createTeam(req);

    var teamPromise = newTeam.save();
    teamPromise.then(function(team) {
      user.team = player;

      var userPromise = user.save()
      userPromise.then(function(user) {
        res.redirect('/success');
      });
    });
  });
});

function createTeam(req) {
  var newTeam = new Team();
  newTeam.name = req.body.name;
  newTeam.points = 0;
}

function getTeamByUserId(id) {
  var promise = Team.find({
    user: id
  }).exec();

  return promise;
}

module.exports = {
  router: router,
  getTeamByUserId: getTeamByUserId
};
