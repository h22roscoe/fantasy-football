module.exports = function(Player) {
  function create(name, position, xi, value) {
    var player = new Player();
    player.name = name;
    player.position = position;
    player.xi = parseInt(xi);
    player.value = parseInt(value);
    player.appearances = 0;
    player.subs = 0;
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
    return Player.findById(id).populate('owner').exec();
  }

  function removeById(id) {
    return Player.findByIdAndRemove(id).exec();
  }

  function findAllByPosition(position) {
    return Player.find({
      position: position
    }).populate('owner').exec();
  }

  function findAll() {
    return Player.find({}).populate('owner').exec();
  }

  return {
    create: create,
    findById: findById,
    removeById: removeById,
    findAllByPosition: findAllByPosition,
    findAll: findAll
  };
};
