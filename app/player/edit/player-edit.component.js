'use strict';

angular
  .module('player.edit')
  .component('playerEdit', {
    templateUrl: 'player/edit/player-edit.template.html',
    controller: [
      '$routeParams',
      '$location',
      'Player',
      'POINTS',
      PlayerEditController
    ]
  });

function PlayerEditController($routeParams, $location, Player, POINTS) {
  var self = this;

  self.positions = [
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Attacker'
  ];

  self.xis = [1, 2, 3, 4, 5, 6, 7];

  self.player = Player.get({
    playerId: $routeParams.playerId
  });

  self.onChange = updatePoints;

  self.onSubmit = function() {
    if (self.playerForm.$valid) {
      self.player.$update({
        playerId: $routeParams.playerId
      }, function() {
        $location.path('/players');
      });
    }
  };

  function updatePoints() {
    switch (self.player.position) {
      case 'Goalkeeper':
        updatePointsWith(POINTS.GK);
        break;
      case 'Defender':
        updatePointsWith(POINTS.DEF);
        break;
      case 'Midfielder':
        updatePointsWith(POINTS.MID);
        break;
      case 'Attacker':
        updatePointsWith(POINTS.ATT);
        break;
      default:
        break;
    }
  }

  function updatePointsWith(points) {
    var newPoints = 0;

    newPoints += points.APPEARANCE * self.player.appearances;
    newPoints += points.SUB * self.player.subs;
    newPoints += points.GOAL * self.player.goals;
    newPoints += points.ASSIST * self.player.assists;
    newPoints += points.CLEANSHEET * self.player.cleansheets;
    newPoints += points.MOTM * self.player.motms;
    newPoints += points.YELLOW * self.player.yellowcards;
    newPoints += points.RED * self.player.redcards;
    newPoints += points.OWNGOAL * self.player.owngoals;

    self.player.points = newPoints;
  }
}
