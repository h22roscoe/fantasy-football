var express = require('express');
var users = require('./users');

var Player = require('./models/player');

var router = express.Router();

router.post('/', function(req, res) {
  var promise = users.getUserById(req.user._id);
  promise.then(function(user) {
    var newPlayer = createPlayer(req);

    var playerPromise = newPlayer.save();
    playerPromise.then(function(player) {
      user.player = player;

      var userPromise = user.save()
      userPromise.then(function(user) {
        res.redirect('/success');
      });
    });
  });
});

var gkPromise = getPlayersInPosition('Goalkeeper');
var defPromise = getPlayersInPosition('Defender');
var midPromise = getPlayersInPosition('Midfielder');
var attPromise = getPlayersInPosition('Attacker');
var allPromise = getAll();

function getPlayersInPosition(position) {
  var promise = Player.find({
    position: position
  }).exec();

  return promise;
}

function getAll() {
  var promise = Player.find({}).exec();
  return promise;
}

function getPlayerByUserId(id) {
  var promise = Player.find({
    user: id
  }).exec();

  return promise;
}

function createPlayer(req) {
  var newPlayer = new Player();
  newPlayer.user = user;
  newPlayer.teams = [];
  newPlayer.name = req.body.player.firstname + " " + req.body.player.surname;
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
  gkPromise: gkPromise,
  defPromise: defPromise,
  midPromise: midPromise,
  attPromise: attPromise,
  allPromise: allPromise,
  getPlayerByUserId: getPlayerByUserId
};
