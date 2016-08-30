'use strict';

angular
  .module('core.player')
  .factory('Player', ['$resource',
    function($resource) {
      return $resource('players/:playerId', {}, {
        query: {
          method: 'GET',
          params: {
            playerId: 'all'
          },
          isArray: true
        }
      });
    }
  ]);
