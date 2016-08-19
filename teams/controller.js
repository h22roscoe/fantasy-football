module.exports = function(Team) {
  function createTeam(name, formation, user) {
    var newTeam = new Team();
    newTeam.name = name;
    newTeam.formation = formation;
    newTeam.user = user;
    newTeam.points = 0;

    return newTeam;
  }

  function findByUserId(id) {
    return Team.findOne({
      user: id
    }).exec();
  }

  return {
    createTeam: createTeam,
    findByUserId: findByUserId
  };
};
