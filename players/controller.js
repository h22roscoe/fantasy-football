var Player = require('../models/player');

function createPlayer(name, position, xi, user) {
  var newPlayer = new Player();
  newPlayer.user = user;
  newPlayer.teams = [];
  newPlayer.name = name;
  newPlayer.position = position;
  newPlayer.xi = parseInt(xi);
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

function findById(id) {
  return Player.find({
    id: id
  }).exec();
}

function findAllByPosition(position) {
  return Player.find({
    position: position
  }).exec();
}

function findByUserId(user) {
  return Player.find({
    user: user
  }).exec();
}

function findAll() {
  return Player.find({}).exec();
}

module.exports = {
  createPlayer: createPlayer,
  findAll: findAll,
  findAllByPosition: findAllByPosition,
  findById: findById,
  findByUserId: findByUserId
};
