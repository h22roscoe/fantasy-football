var express = require('express');
var users = require('./users');

var Player = require('./models/player');

var router = express.Router();

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

        res.redirect('/home');
      });
    });
  });
});

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

router.get('/', function(req, res) {
  getAll().then(function(players) {
    res.json({
      players: players
    });
  });
});

router.get('/new', function(req, res) {
  res.render('playernew');
});

router.get('/:id', function(req, res) {
  Player.findOne({
    id: req.params.id
  }, function(err, player) {
    if (err) {
      throw err;
    }

    res.json(player);
  });
});

router.get('/me', function(req, res) {
  var userPromise = users.getUserByUsername(req.user.username);
  userPromise().then(function(user) {
    var playerPromise = getPlayerByUserId(user._id);
    playerPromise().then(function(player) {
      res.json(player);
    });
  });
});

router.get('/goalkeepers', function(req, res) {
  console.log('HI');
  //Player.find({
  //  position: 'Goalkeeper'
  //}).then(function(goalkeepers) {
  //  console.log('Goalkeepers returned: ', goalkeepers);
  //  res.json({
  //    players: goalkeepers
  //  });
  //});
  res.json({
    players: [1, 2, 3]
  });
});

router.get('/defenders', function(req, res) {
  Player.find({
    position: 'Defender'
  }).then(function(defenders) {
    res.json({
      players: defenders
    });
  });
});

router.get('/midfielders', function(req, res) {
  Player.find({
    position: 'Midfielder'
  }).then(function(midfielders) {
    res.json({
      players: midfielders
    });
  });
});

router.get('/attackers', function(req, res) {
  Player.find({
    position: 'Attacker'
  }).then(function(attackers) {
    res.json({
      players: attackers
    });
  });
});

module.exports = {
  router: router,
  allPromise: getAll,
  getPlayerByUserId: getPlayerByUserId
};
