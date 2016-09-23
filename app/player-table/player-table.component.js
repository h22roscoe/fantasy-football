'use strict';

angular
  .module('playerTable')
  .component('playerTable', {
    templateUrl: 'player-table/player-table.template.html',
    controller: ['Player', PlayerTableController]
  });

function PlayerTableController(Player) {
  var self = this;

  this.players = Player.query();
  this.orderProp = 'points';
}
