'use strict';

angular
  .module('playerTable')
  .component('playerTable', {
    templateUrl: 'player-table/player-table.template.html',
    controller: ['Player', 'AuthService', PlayerTableController]
  });

function PlayerTableController(Player, AuthService) {
  var self = this;

  this.players = Player.query();
  this.orderProp = 'points';

  this.admin = AuthService.isAdmin() === AuthService.OK;
}
