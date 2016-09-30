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
  self.isLoggedIn = Auth.isLoggedIn() === Auth.OK;
  self.player = Auth.player;
  self.players = Player.query();
  self.orderProp = 'points';

  self.delete = function(player) {
    var sure = confirm('Are you sure you want to delete this player?');
    if (sure) {
      var idx = self.players.indexOf(player);

      Player.delete({
        playerId: player._id
      });

      self.players.splice(idx, 1);
    }
  };

  self.getHeaders = function() {
    if (self.players && self.players.length > 0) {
      var aPlayer = self.players[0];

      return Object.keys(aPlayer);
    }
  }
}
