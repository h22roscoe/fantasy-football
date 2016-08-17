var Team = require('../models/team');

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

module.exports = {
  createTeam: createTeam,
  findByUserId: findByUserId
};
