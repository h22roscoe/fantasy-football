'use strict';

angular
  .module('forms')
  .component('loginForm', {
    templateUrl: 'forms/login/login.template.html',
    controller: ['$location', 'AuthService', LoginCtrl]
  });

function LoginCtrl($location, AuthService) {
  var self = this;

  self.credentials = {
    username: '',
    password: ''
  };

  self.onSubmit = function() {
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
