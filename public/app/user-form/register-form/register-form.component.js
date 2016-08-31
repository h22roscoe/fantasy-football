'use strict';

angular
  .module('meanApp')
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
      .error(function(err) {
        alert(err);
      })
      .then(function() {
        $location.path('/teams');
      });
  };
}
