module.exports = function(Team) {
  function create(name, formation) {
    var newTeam = new Team();
    newTeam.name = name;
    newTeam.formation = formation;
    // newTeam.goalkeepers = goalkeepers;
    // newTeam.defenders = defenders;
    // newTeam.midfielders = midfielders;
    // newTeam.attackers = attackers;
    // newTeam.substitutes = substitutes;
    newTeam.points = 0;

    return newTeam;
  }

  function findByOwnerId(id) {
    return Team.findOne({
      owner: id
    }).exec();
  }

  function findAll() {
    return Team.find({}).populate('owner').exec();
  }

  function findById(id) {
    return Team.findById(id).exec();
  }

  return {
    create: create,
    findByOwnerId: findByOwnerId,
    findAll: findAll,
    findById: findById
  };
};
