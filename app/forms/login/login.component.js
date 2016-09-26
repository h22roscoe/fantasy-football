'use strict';

angular
  .module('forms')
  .component('loginForm', {
    templateUrl: 'forms/login/login.template.html',
    controller: ['$location', 'Auth', LoginCtrl]
  });

function LoginCtrl($location, Auth) {
  var self = this;

  self.credentials = {
    username: '',
    password: ''
  };

  self.onSubmit = function() {
    Auth
      .login(self.credentials)
      .then(function(data) {
        if (data.user) {
          $location.path('/players');
        }
      });
  };
}
