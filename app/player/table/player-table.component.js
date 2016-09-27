'use strict';

angular
  .module('player.table')
  .component('playerTable', {
    templateUrl: 'player/table/player-table.template.html',
    controller: ['Player', 'Auth', PlayerTableController]
  });

function PlayerTableController(Player, Auth) {
  var self = this;

  self.isAdmin = Auth.isAdmin() === Auth.OK;
  self.players = Player.query();
  self.orderProp = 'points';

  self.getHeaders = function() {
    if (self.players && self.players.length > 0) {
      var aPlayer = self.players[0];

      return Object.keys(aPlayer);
    }
  }
}
