'use strict';

angular
  .module('userForm')
  .component('userForm', {
    templateUrl: 'user-form/user-form.template.html',
    controller: ['$location', '$log', UserCtrl]
  });

function UserCtrl($location, $log) {

}
