'use strict';

angular
  .module('playerEdit')
  .component('playerEdit', {
    templateUrl: 'player-edit/player-edit.template.html',
    controller: ['$routeParams', '$location', 'Player', PlayerEditController]
  });

function PlayerEditController($routeParams, $location, Player) {
  var self = this;

  var APP_POINTS = 3;
  var GK_GOAL_POINTS = 10;
  var DEF_GOAL_POINTS = 8;
  var MID_GOAL_POINTS = 5;
  var ATT_GOAL_POINTS = 4;
  var GK_ASSIST_POINTS = 8;
  var DEF_ASSIST_POINTS = 6;
  var MID_ASSIST_POINTS = 5;
  var ATT_ASSIST_POINTS = MID_ASSIST_POINTS;
  var CS_POINTS = 8;
  var OG_POINTS = -5;
  var YELLOW_POINTS = -5;
  var RED_POINTS = -10;
  var MOTM_POINTS = 8;

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
    self.player.$update({
      playerId: $routeParams.playerId
    }, function(data) {
      $location.path('/teams');
    });
  };

  function updatePoints() {
    var newPoints = 0;

    newPoints += APP_POINTS * self.player.appearances;
    newPoints += MOTM_POINTS * self.player.motms;
    newPoints += YELLOW_POINTS * self.player.yellowcards;
    newPoints += RED_POINTS * self.player.redcards;
    newPoints += OG_POINTS * self.player.owngoals;

    switch (self.player.position) {
      case 'Goalkeeper':
        newPoints += GK_GOAL_POINTS * self.player.goals;
        newPoints += GK_ASSIST_POINTS * self.player.assists;
        newPoints += CS_POINTS * self.player.cleansheets;
        break;
      case 'Defender':
        newPoints += DEF_GOAL_POINTS * self.player.goals;
        newPoints += DEF_ASSIST_POINTS * self.player.assists;
        newPoints += CS_POINTS * self.player.cleansheets;
        break;
      case 'Midfielder':
        newPoints += MID_GOAL_POINTS * self.player.goals;
        newPoints += MID_ASSIST_POINTS * self.player.assists;
        break;
      case 'Attacker':
        newPoints += ATT_GOAL_POINTS * self.player.goals;
        newPoints += ATT_ASSIST_POINTS * self.player.assists;
        break;
    }

    self.player.points = newPoints;
  };
}
