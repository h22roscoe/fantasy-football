'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', '$log', 'AuthService', 'Player', RegisterCtrl]
  });

function RegisterCtrl($location, $log, AuthService, Player) {
  var self = this;

  self.isPlayer = false;

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
    AuthService
      .register(self.credentials)
      .then(function(data) {
        if (self.isPlayer) {
          self.player.$save(function() {
            $location.path('/teams');
          });
        } else {
          $location.path('/teams');
        }
      });
  };
}
