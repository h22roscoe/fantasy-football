module.exports = function(Player) {
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
    return Player.findById(id).exec();
  }

  function findAllByPosition(position) {
    return Player.find({
      position: position
    }).exec();
  }

  function findByUserId(user) {
    return Player.findOne({
      user: user
    }).exec();
  }

  function findAll() {
    return Player.find({}).exec();
  }

  return {
    createPlayer: createPlayer,
    findById: findById,
    findAllByPosition: findAllByPosition,
    findByUserId: findByUserId,
    findAll: findAll
  };
};
