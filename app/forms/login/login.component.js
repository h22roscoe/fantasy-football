'use strict';

angular
  .module('forms')
  .component('loginForm', {
    templateUrl: 'forms/login/login.template.html',
    controller: ['$location', 'Auth', LoginCtrl]
  });

function LoginCtrl($location, Auth) {
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

  self.credentials = {
    username: '',
    password: ''
  };

  self.onSubmit = function() {
    Auth
      .login(self.credentials)
      .then(function success(res) {
        if (res.status === 200) {
          $location.path('/players');
        } else if (res.status === 401) {
          self.addAlert('You got your username or password wrong');
        } else {
          self.addAlert('Something went wrong. I don\'t know why. Maybe try again?');
        }
      });
  };
}
