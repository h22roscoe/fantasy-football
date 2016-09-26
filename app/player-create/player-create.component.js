'use strict';

angular
  .module('playerCreate')
  .component('playerCreate', {
    templateUrl: 'player-create/player-create.template.html',
    controller: ['$location', 'Player', 'User', PlayerCreateCtrl]
  });

function PlayerCreateCtrl($location, Player, User) {
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
        User.addPlayer(response.player).then(function() {
          $location.path('/players');
        });
      });
    }
  }
}
