'use strict';

angular
  .module('team.create')
  .component('teamCreate', {
    templateUrl: 'team/create/team-create.template.html',
    controller: ['Team', 'Player', 'User', '$location', TeamCreateCtrl]
  });

function TeamCreateCtrl(Team, Player, User, $location) {
  var self = this;

  self.formations = [
    '4-4-2',
    '4-5-1',
    '4-3-3',
    '3-4-3',
    '3-5-2'
  ];

  self.goalkeepers = {
    allowedTypes: ['GK'],
    players: Player.query({
      playerId: 'goalkeepers'
    })
  };

  self.defenders = {
    allowedTypes: ['DEF'],
    players: Player.query({
      playerId: 'defenders'
    })
  };

  self.midfielders = {
    allowedTypes: ['MID'],
    players: Player.query({
      playerId: 'midfielders'
    })
  };

  self.attackers = {
    allowedTypes: ['ATT'],
    players: Player.query({
      playerId: 'attackers'
    })
  };

  self.team = new Team();
  self.team.name = '';
  self.team.formation = '4-4-2';
  self.team.goalkeepers = {
    allowedTypes: ['GK'],
    max: 1,
    players: []
  };
  self.team.defenders = {
    allowedTypes: ['DEF'],
    max: 4,
    players: []
  };
  self.team.midfielders = {
    allowedTypes: ['MID'],
    max: 4,
    players: []
  };
  self.team.attackers = {
    allowedTypes: ['ATT'],
    max: 2,
    players: []
  };

  self.formationChange = function() {
    var regex = /^(\d)-(\d)-(\d)$/;
    var match = self.team.formation.match(regex);
    if (match) {
      self.team.defenders.max = match[1]; // The 0th index would be the whole string
      self.team.midfielders.max = match[2];
      self.team.attackers.max = match[3];
    }
  };

  self.onSubmit = function() {
    if (self.teamForm.$valid && lengthsMatch()) {
      self.team.$save(function (response) {
        User.addTeam(response.team).then(function () {
          $location.path('/players');
        })
      });
    }
  };

  function lengthsMatch() {
    return self.team.attackers.players.length === self.team.attackers.max
      && self.team.midfielders.players.length === self.team.midfielders.max
      && self.team.goalkeepers.players.length === self.team.goalkeepers.max
      && self.team.defenders.players.length === self.team.defenders.max;
  }
}
