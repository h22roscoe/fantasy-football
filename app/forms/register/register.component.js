'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', 'AuthService', 'Player', RegisterCtrl]
  });

function RegisterCtrl($location, AuthService, Player) {
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
    AuthService
      .register(self.credentials)
      .then(function(data) {
        self.player.$save(function() {
          $location.path('/players');
        });
      });
  };
}
