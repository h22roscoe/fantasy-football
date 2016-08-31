'use strict';

angular
  .module('meanApp')
  .component('userForm', {
    templateUrl: 'user-form/user-form.template.html',
    controller: ['$location', '$log', 'AuthService', UserCtrl]
  });

function UserCtrl($location, $log, AuthService) {

}
