'use strict';

angular
  .module('core.nav')
  .component('topNav', {
    templateUrl: 'core/nav/nav.template.html',
    controller: ['Auth', TopNavController]
  });

function TopNavController(Auth) {
  var self = this;

  self.isLoggedIn = function() {
    return Auth.isLoggedIn() === Auth.OK;
  };

  self.player = Auth.player;

  self.team = Auth.team;

  self.username = Auth.username;
  
  self.logout = Auth.logout;
}
