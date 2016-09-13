module.exports = function(Team) {
  function createTeam(body, user) {
    var newTeam = new Team();
    newTeam.name = body.name;
    newTeam.formation = body.formation;
    // newTeam.goalkeepers = body.goalkeepers;
    // newTeam.defenders = body.defenders;
    // newTeam.midfielders = body.midfielders;
    // newTeam.attackers = body.attackers;
    // newTeam.substitutes = body.substitutes;
    newTeam.user = user;
    newTeam.points = 0;

    return newTeam;
  }

  function findByUserId(id) {
    return Team.findOne({
      user: id
    }).exec();
  }

  function findAll() {
    return Team.find({}).populate('user').exec();
  }

  function findById(id) {
    return Team.findById(id).exec();
  }

  return {
    createTeam: createTeam,
    findByUserId: findByUserId,
    findAll: findAll,
    findById: findById
  };
};
