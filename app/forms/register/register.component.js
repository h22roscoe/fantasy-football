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
    username: '',
    password: ''
  };

  self.onSubmit = function() {
    $log.info('Submitting registration');
    AuthService
      .register(self.credentials)
      .then(function(data) {
        if (data.user) {
          $location.path('/teams');
        } else {
          $log.debug(data.err);
        }
      });
  };
}
