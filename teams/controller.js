module.exports = function(Team) {
  function create(name, formation, gks, defs, mids, atts) {
    var newTeam = new Team();
    newTeam.name = name;
    newTeam.formation = formation;
    newTeam.goalkeepers = gks;
    newTeam.defenders = defs;
    newTeam.midfielders = mids;
    newTeam.attackers = atts;
    newTeam.points = 0;

    return newTeam;
  }

  function findByOwnerId(id) {
    return Team.findOne({
      owner: id
    })
      .populate('goalkeepers')
      .populate('defenders')
      .populate('midfielders')
      .populate('attackers').exec();
  }

  function findAll() {
    return Team.find({}).populate('owner').exec();
  }

  function findById(id) {
    return Team.findById(id)
      .populate('goalkeepers')
      .populate('defenders')
      .populate('midfielders')
      .populate('attackers').exec();
  }

  return {
    create: create,
    findByOwnerId: findByOwnerId,
    findAll: findAll,
    findById: findById
  };
};
