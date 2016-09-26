'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', 'Auth', RegisterCtrl]
  });

function RegisterCtrl($location, Auth) {
  var self = this;

  self.onSubmit = function() {
    if (self.registerForm.$valid) {
      Auth
        .register(self.credentials)
        .then(function() {
          $location.path('/players');
        });
    }
  };
}
