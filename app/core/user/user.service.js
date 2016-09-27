'use strict';

angular
  .module('core.user')
  .factory('User', ['$http', 'Me', User]);

function User($http, Me) {
  return {
    addPlayer: addPlayer,
    addTeam: addTeam
  };

  function addPlayer(player) {
    return $http.put('/users/add-player', {
      player: player
    }).then(function success(res) {
      Me.player = res.data.user.player;
      return res;
    });
  }
  function addTeam(team) {
    return $http.put('/users/add-team', {
      team: team
    }).then(function success(res) {
      Me.team = res.data.user.team;
      return res;
    });
  }
}
