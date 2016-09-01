'use strict';

angular
  .module('forms')
  .component('loginForm', {
    templateUrl: 'forms/login/login.template.html',
    controller: ['$location', '$log', 'AuthService', LoginCtrl]
  });

function LoginCtrl($location, $log, AuthService) {
  var self = this;

  self.credentials = {
    username: '',
    password: ''
  };

  self.onSubmit = function() {
    $log.info('Submitting log in form');
    AuthService
      .login(self.credentials)
      .then(function(data) {
        if (data.user) {
          $location.path('/teams');
        } else {
          $log.debug(data);
        }
      });
  };
}
