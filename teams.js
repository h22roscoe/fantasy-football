var express = require('express');
var players = require('./players');
var users = require('./users');

var Team = require('./models/team');

router = express.Router();

router.post('/', function(req, res) {
  var promise = users.getUserByUsername(req.user.username);
  promise.then(function(user) {
    var newTeam = createTeam(req, user);
    newTeam.save(function(err, team) {
      if (err) {
        throw err;
      }

      user.team = team;
      user.save(function(err) {
        if (err) {
          throw err;
        }

        res.redirect('/success');
      });
    });
  });
});

router.get('/new', function(req, res) {
  players.gkPromise().then(function(gks) {
    players.defPromise().then(function(defs) {
      players.midPromise().then(function(mids) {
        players.attPromise().then(function(atts) {
          players.allPromise().then(function(subs) {
            res.render('teamnew', {
              players: {
                goalkeepers: gks,
                defenders: defs,
                midfielders: mids,
                attackers: atts,
                substitutes: subs
              }
            });
          });
        });
      });
    });
  });
});

function createTeam(req, user) {
  var newTeam = new Team();
  newTeam.name = req.body.team.name;
  newTeam.formation = req.body.team.formation;
  newTeam.user = user;
  newTeam.points = 0;

  return newTeam;
}

function getTeamByUserId(id) {
  var promise = Team.findOne({
    user: id
  }).exec();

  return promise;
}

module.exports = {
  router: router,
  getTeamByUserId: getTeamByUserId
};
