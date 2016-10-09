'use strict';

angular
  .module('forms')
  .component('registerForm', {
    templateUrl: 'forms/register/register.template.html',
    controller: ['$location', 'Auth', RegisterCtrl]
  })
  .directive('pwCheck', [function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function() {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('match', v);
          });
        });
      }
    }
  }]);

function RegisterCtrl($location, Auth) {
  var self = this;

  self.credentials = {
    username: '',
    password: ''
  };

  self.cpassword = '';

  self.passMatch = function() {
    return self.cpassword === self.credentials.password;
  };

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
    if (self.registerForm.$valid && self.passMatch()) {
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
