'use strict';

angular
  .module('playerTable')
  .component('playerTable', {
    templateUrl: 'player-table/player-table.template.html',
    controller: ['Player', PlayerTableController]
  });

function PlayerTableController(Player) {
  var self = this;

  self.players = Player.query();
  self.orderProp = 'points';

  self.getHeaders = function() {
    if (self.players && self.players.length > 0) {
      var aPlayer = self.players[0];

      return Object.keys(aPlayer);
    }
  }
}
