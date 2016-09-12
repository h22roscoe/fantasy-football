'use strict';

angular
  .module('playerDetail')
  .component('playerDetail', {
    templateUrl: 'player-detail/player-detail.template.html',
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
