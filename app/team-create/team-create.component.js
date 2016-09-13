'use strict';

angular
  .module('teamCreate')
  .component('teamCreate', {
    templateUrl: 'team-create/team-create.template.html',
    controller: ['Team', 'Player', '$location', '$log', TeamCreateCtrl]
  });

function TeamCreateCtrl(Team, Player, $location, $log) {
  var self = this;

  self.formations = [
    '4-4-2',
    '4-5-1',
    '4-3-3',
    '3-4-3',
    '3-5-2'
  ];

  self.goalkeepers = Player.query({
    playerId: 'goalkeepers'
  });

  self.defenders = Player.query({
    playerId: 'defenders'
  });

  self.midfielders = Player.query({
    playerId: 'midfielders'
  });

  self.attackers = Player.query({
    playerId: 'attackers'
  });

  self.allPlayers = Player.query();

  self.team = new Team();
  self.team.name = '';
  self.team.formation = '4-4-2';
  self.team.goalkeepers = [];
  self.team.defenders = [];
  self.team.midfielders = [];
  self.team.attackers = [];
  self.team.substitutes = [];

  self.defs = 4; // Since formation starts as 4-4-2
  self.mids = 4;
  self.atts = 2;
  self.subs = 3; // Regardless of formation

  self.formationChange = function() {
    var regex = /^(\d)-(\d)-(\d)$/;
    var match = self.team.formation.match(regex);
    if (match) {
      self.defs = match[1]; // The 0th index would be the whole string
      self.mids = match[2];
      self.atts = match[3];
    }
  };

  self.onSubmit = function() {
    gatherPlayersIntoTeam();

    self.team.$save(function success(data) {
      $location.path('/teams');
    });
  };

  // Gathers the chosen players from their ng-model parts into the team model
  function gatherPlayersIntoTeam() {
    self.team.goalkeepers.push(self.gk);

    for (var d = 1; d <= self.defs; d++) {
      var defKey = 'def' + d;
      self.team.defenders.push(self[defKey]);
    }

    for (var m = 1; m <= self.mids; m++) {
      var midKey = 'mid' + m;
      self.team.midfielders.push(self[midKey]);
    }

    for (var a = 1; a <= self.atts; a++) {
      var attKey = 'att' + a;
      self.team.attackers.push(self[attKey]);
    }

    for (var s = 1; s <= self.subs; s++) {
      var subKey = 'sub' + s;
      self.team.substitutes.push(self[subKey]);
    }
  };
}
