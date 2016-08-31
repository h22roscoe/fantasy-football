'use strict';

angular
  .module('core.team')
  .factory('Team', ['$resource',
    function($resource) {
      return $resource('teams/:teamId', {}, {
        // Stick to default options
      });
    }
  ]);
