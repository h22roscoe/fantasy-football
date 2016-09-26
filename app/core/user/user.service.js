'use strict';

angular
  .module('core.user')
  .factory('User', ['$http', User]);

function User($http) {
  return {
    addPlayer: addPlayer,
    addTeam: addTeam
  };

  function addPlayer(player) {
    return $http.put('/users/add-player', {
      player: player
    });
  }
  function addTeam(team) {
    return $http.put('/users/add-team', {
      team: team
    });
  }
}
