'use strict';

angular
  .module('teamCreate')
  .component('teamCreate', {
    templateUrl: 'team-create/team-create.template.html',
    controller: ['Team', 'Player', '$location', TeamCreateCtrl]
  });

function TeamCreateCtrl(Team, Player, $location) {
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
    self.team.$save(function success() {
      $location.path('/teams');
    });
  };
}
