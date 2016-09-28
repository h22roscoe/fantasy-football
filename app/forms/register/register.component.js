'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', 'Auth', RegisterCtrl]
  });

function RegisterCtrl($location, Auth) {
  var self = this;
  
  self.alerts = [];

  self.addAlert = function(msg, type) {
    self.alerts.push({
      msg: msg,
      type: type
    });
  };

  self.closeAlert = function(index) {
    self.alerts.splice(index, 1);
  };

  self.onSubmit = function() {
    if (self.registerForm.$valid) {
      Auth
        .register(self.credentials)
        .then(function success(res) {
          if (res.status === 200) {
            $location.path('/players');
          } else {
            self.addAlert(res.data.err.message);
          } 
        });
    }
  };
}
