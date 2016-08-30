'use strict';

angular
  .module('core.team')
  .factory('Team', ['$resource',
    function($resource) {
      return $resource('teams/:teamId', {}, {
        query: {
          method: 'GET',
          params: {
            teamId: 'all'
          },
          isArray: true
        }
      });
    }
  ]);
