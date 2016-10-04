'use strict';

angular
  .module('team.create')
  .component('teamCreate', {
    templateUrl: 'team/create/team-create.template.html',
    controller: ['Team', 'Player', 'User', '$location', TeamCreateCtrl]
  });

function TeamCreateCtrl(Team, Player, User, $location) {
  var self = this;

  self.alerts = [];

   self.addAlert = function(msg, type) {
    self.alerts.push({
      msg: msg,
      type: type
    });
  };

  self.closeAlert = function(index) {
    self.alerts.splice(index, 1);
  };

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
      self.team.defenders.max = parseInt(match[1]); // The 0th index would be the whole string
      self.team.midfielders.max = parseInt(match[2]);
      self.team.attackers.max = parseInt(match[3]);
    }
  };

  self.onSubmit = function() {
    if (!lengthsMatch()) {
      self.addAlert('The number of players must match the chosen formation');

      if (self.teamForm.$invalid) {
        self.addAlert('You must fill in the team name.');
      }

      return;
    }

    if (self.teamForm.$invalid) {
      self.addAlert('You must fill in the team name.');
      return;
    }

    self.team.goalkeepers = extractListOfIds(self.team.goalkeepers.players);
    self.team.defenders = extractListOfIds(self.team.defenders.players);
    self.team.midfielders = extractListOfIds(self.team.midfielders.players);
    self.team.attackers = extractListOfIds(self.team.attackers.players);

    self.team.$save(function(res) {
      User.addTeam(res.team).then(function() {
        $location.path('/teams');
      });
    });
  };

  function extractListOfIds(arr) {
    var idArr = [];

    for (var i = 0; i < arr.length; i++) {
      idArr.push(arr[i]._id);
    }

    return idArr;
  }

  function lengthsMatch() {
    var atts =
      self.team.attackers.players.length === self.team.attackers.max;
    var mids =
      self.team.midfielders.players.length === self.team.midfielders.max;
    var defs =
      self.team.defenders.players.length === self.team.defenders.max;
    var gks =
      self.team.goalkeepers.players.length === self.team.goalkeepers.max;

    return atts && mids && defs && gks;
  }
}
