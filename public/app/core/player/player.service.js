'use strict';

angular
  .module('core.player')
  .factory('Player', ['$resource',
    function($resource) {
      return $resource('players/:playerId', {
        // Stick to default options
      });
    }
  ]);
