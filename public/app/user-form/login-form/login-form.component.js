'use strict';

angular
  .module('loginForm')
  .component('loginForm', {
    templateUrl: 'user-form/login-form/login-form.template.html',
    controller: ['$location', '$log', 'AuthService', LoginCtrl]
  });

function LoginCtrl($location, $log, AuthService) {
  this.credentials = {
    name: '',
    password: ''
  };

  this.onSubmit = function(regOrLogin) {
    $log.info('Submitting log in form');
    AuthService
      .login(this.credentials)
      .then(function(data) {
        $log.info(data);
        $location.path('/teams');
      }, function(err) {
        alert(err);
      });
  };
}
