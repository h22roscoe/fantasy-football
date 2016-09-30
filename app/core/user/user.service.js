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
      id: player._id
    }).then(function success(res) {
      Me.player = player._id;
      return res;
    });
  }
  function addTeam(team) {
    return $http.put('/users/add-team', {
      id: team._id
    }).then(function success(res) {
      Me.team = team._id;
      return res;
    });
  }
}
