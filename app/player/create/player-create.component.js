'use strict';

angular
  .module('player.create')
  .component('playerCreate', {
    templateUrl: 'player/create/player-create.template.html',
    controller: ['$location', 'Player', PlayerCreateCtrl]
  });

function PlayerCreateCtrl($location, Player) {
  var self = this;

  self.positions = [
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Attacker'
  ];

  self.xis = [1, 2, 3, 4, 5, 6, 7];

  self.player = new Player();
  self.player.name = '';
  self.player.position = 'Goalkeeper';
  self.player.xi = 1;

  self.onSubmit = function() {
    if (self.playerForm.$valid) {
      self.player.$save(function(response) {
        $location.path('/players');
      });
    }
  };
}
