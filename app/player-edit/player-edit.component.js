'use strict';

angular
  .module('playerEdit')
  .component('playerEdit', {
    templateUrl: 'player-edit/player-edit.template.html',
    controller: ['$routeParams', 'Player', PlayerEditController]
  });

function PlayerEditController($routeParams, Player) {
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
    console.log(self.player);
  };
}
