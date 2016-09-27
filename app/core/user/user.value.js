'use strict';

angular
  .module('core.user')
  .value('Me', {
    username: null,
    loggedIn: false,
    admin: false,
    team: null,
    player: null
  });
