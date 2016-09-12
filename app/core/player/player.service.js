'use strict';

angular
  .module('core.player')
  .factory('Player', ['$resource',
    function($resource) {
      return $resource('players/:playerId', {
        update: {
          method: 'PUT'
        }
      }, {
        // Stick to default options
      });
    }
  ]);
