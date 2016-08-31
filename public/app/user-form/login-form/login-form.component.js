'use strict';

angular
  .module('meanApp')
  .component('registerForm', {
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
      .error(function(err) {
        alert(err);
      })
      .then(function() {
        $location.path('/teams');
      });
  };
}
