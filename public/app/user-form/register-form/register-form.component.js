'use strict';

angular
  .module('registerForm')
  .component('registerForm', {
    templateUrl: 'user-form/register-form/register-form.template.html',
    controller: ['$location', '$log', 'AuthService', RegisterCtrl]
  });

function RegisterCtrl($location, $log, AuthService) {
  this.credentials = {
    name: '',
    password: ''
  };

  this.onSubmit = function(regOrLogin) {
    $log.info('Submitting registration');
    AuthService
      .register(this.credentials)
      .then(function(data) {
        $log.info(data);
        $location.path('/teams');
      }, function(err) {
        alert(err);
      });
  };
}
