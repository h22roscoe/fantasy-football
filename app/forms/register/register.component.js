'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', '$log', 'AuthService', RegisterCtrl]
  });

function RegisterCtrl($location, $log, AuthService) {
  var self = this;

  self.credentials = {
    name: '',
    password: ''
  };

  self.onSubmit = function() {
    $log.info('Submitting registration');
    AuthService
      .register(self.credentials)
      .then(function(user) {
        $log.info(user);
        if (user) {
          $location.path('/teams');
        }
      });
  };
}
