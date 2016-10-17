module.exports = function(Team) {
  function create(name, formation, value, points, gks, defs, mids, atts) {
    var newTeam = new Team();
    newTeam.name = name;
    newTeam.value = parseInt(value);
    newTeam.formation = formation;
    newTeam.goalkeepers = gks;
    newTeam.defenders = defs;
    newTeam.midfielders = mids;
    newTeam.attackers = atts;
    newTeam.points = points;

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

  function gatherPoints() {
    Team.aggregate([{
      '$project': {
        'players': {
          '$setUnion': [
            '$goalkeepers',
            '$defenders',
            '$midfielders',
            '$attackers'
          ]
        }
      }
    }, {
      '$unwind': '$players'
    }, {
      '$lookup': {
        'from': 'players',
        'localField': 'players',
        'foreignField': '_id',
        'as': 'resultingArray'
      }
    }, {
      '$unwind': '$resultingArray'
    }, {
      '$group': {
        '_id': '$_id',
        'totalPoints': {
          '$sum': '$resultingArray.points'
        },
        'totalValue': {
          '$sum': '$resultingArray.value'
        }
      }
    }], function(err, result) {
      if (err) {
        console.log(err);
        return;
      }

      updateTeams(result);
    });
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
    gatherPoints: gatherPoints,
    findByOwnerId: findByOwnerId,
    findAll: findAll,
    findById: findById
  };

  function updateTeams(result) {
    for (var i = 0; i < result.length; i++) {
      var teamPoints = result[i];
      Team.findById(teamPoints._id, function(err, team) {
        if (err) {
          throw err;
        }

        team.points = teamPoints.totalPoints;
        team.value = teamPoints.totalValue;

        team.save(function(err) {
          if (err) {
            throw err;
          }
        });
      });
    }
  }
};
