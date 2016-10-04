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
        'total': {
          '$sum': '$resultingArray.points'
        }
      }
    }], function(err, result) {
      if (err) {
        return;
      }
      
      updateTeamsWithPoints(result);
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
  
  function updateTeamsWithPoints(result) {
    for (var i = 0; i < result.length; i++) {
      var teamPoints = result[i];
      Team.findById(teamPoints._id, function(err, team) {
        if (err) {
          throw err;
        }
        
        team.points = teamPoints.total;
        
        team.save(function(err) {
          if (err) {
            throw err;
          }
        });
      });
    }
  }
};
