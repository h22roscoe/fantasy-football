'use strict';

angular
  .module('playerCreate')
  .component('playerCreate', {
    templateUrl: 'player-create/player-create.template.html',
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

  self.credentials = {
    username: '',
    password: ''
  };

  self.player = new Player();
  self.player.name = '';
  self.player.position = 'Goalkeeper';
  self.player.xi = 1;

  self.onSubmit = function() {
    if (self.playerForm.$valid) {
      self.player.$save(function() {
        $location.path('/players');
      });
    }
  }
}
