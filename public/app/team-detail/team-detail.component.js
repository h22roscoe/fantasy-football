'use strict';

// Register `teamDetail` component, along with its associated controller and template
angular
  .module('teamDetail')
  .component('teamDetail', {
    templateUrl: '/app/team-detail/team-detail.template.html',
    controller: ['$routeParams', 'Team',
      function TeamDetailController($routeParams, Team) {
        var self = this;
        self.team = Team.get({
          teamId: $routeParams.teamId
        });
      }
    ]
  });
