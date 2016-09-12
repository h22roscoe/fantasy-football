'use strict';

angular
  .module('playerEdit')
  .component('playerEdit', {
    templateUrl: 'player-edit/player-edit.template.html',
    controller: ['$routeParams', '$location', 'Player', PlayerEditController]
  });

function PlayerEditController($routeParams, $location, Player) {
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

  self.onSubmit = function() {
    self.player.$update({
      playerId: $routeParams.playerId
    }, function(data) {
      $location.path('/teams');
    });
  };
}
