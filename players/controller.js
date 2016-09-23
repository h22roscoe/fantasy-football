module.exports = function(Player) {
  function create(name, position, xi) {
    var player = new Player();
    player.name = name;
    player.position = position;
    player.xi = parseInt(xi);
    player.appearances = 0;
    player.goals = 0;
    player.owngoals = 0;
    player.assists = 0;
    player.cleansheets = 0;
    player.motms = 0;
    player.points = 0;
    player.yellowcards = 0;
    player.redcards = 0;

    return player;
  }

  function findById(id) {
    return Player.findById(id).exec();
  }

  function findAllByPosition(position) {
    return Player.find({
      position: position
    }).exec();
  }

  function findAll() {
    return Player.find({}).exec();
  }

  return {
    create: create,
    findById: findById,
    findAllByPosition: findAllByPosition,
    findAll: findAll
  };
};
