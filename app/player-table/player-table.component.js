'use strict';

angular
  .module('playerTable')
  .component('playerTable', {
    templateUrl: 'player-table/player-table.template.html',
    controller: ['Player',
      function PlayerTableController(Player) {
        this.players = Player.query();
        this.orderProp = 'points';
      }
    ]
  });
