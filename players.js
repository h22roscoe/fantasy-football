var express = require('express');
var users = require('./users');

var Player = require('./models/player');

var router = express.Router();

router.post('/', function(req, res) {
  var promise = users.getUserByUsername(req.user.username);
  promise.then(function(user) {
    var newPlayer = createPlayer(req, user);

    newPlayer.save(function(err, player) {
      if (err) {
        throw err;
      }

      user.player = player;
      user.save(function(err) {
        if (err) {
          throw err;
        }

        res.redirect('/success');
      });
    });
  });
});

function getPlayersInPosition(position) {
  return function() {
    var promise = Player.find({
      position: position
    }).exec();

    return promise;
  };
}

function getAll() {
  var promise = Player.find({}).exec();
  return promise;
}

function getPlayerByUserId(id) {
  var promise = Player.findOne({
    user: id
  }).exec();

  return promise;
}

function createPlayer(req, user) {
  var newPlayer = new Player();
  newPlayer.user = user;
  newPlayer.teams = [];
  newPlayer.name = req.body.player.firstname + ' ' + req.body.player.surname;
  newPlayer.position = req.body.player.position;
  newPlayer.xi = parseInt(req.body.player.xi);
  newPlayer.appearances = 0;
  newPlayer.goals = 0;
  newPlayer.assists = 0;
  newPlayer.cleansheets = 0;
  newPlayer.motms = 0;
  newPlayer.points = 0;
  newPlayer.yellowcards = 0;
  newPlayer.redcards = 0;

  return newPlayer;
}

module.exports = {
  router: router,
  gkPromise: getPlayersInPosition('Goalkeeper'),
  defPromise: getPlayersInPosition('Defender'),
  midPromise: getPlayersInPosition('Midfielder'),
  attPromise: getPlayersInPosition('Attacker'),
  allPromise: getAll,
  getPlayerByUserId: getPlayerByUserId
};
