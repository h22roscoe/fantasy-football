'use strict';

angular
  .module('player.detail')
  .component('playerDetail', {
    templateUrl: 'player/detail/player-detail.template.html',
    bindings: {
      player: '='
    },
    controller: [
      PlayerDetailController
    ]
  });

function PlayerDetailController() {
  var self = this;
}
