'use strict';

angular
  .module('playerDetail')
  .component('playerDetail', {
    templateUrl: 'player-detail/player-detail.template.html',
    controller: PlayerDetailController
  });

function PlayerDetailController($routeParams, Player) {
  var self = this;

  self.player = Player.get({
    playerId: $routeParams.playerId
  });
}
