'use strict';

// Register `teamDetail` component, along with its associated controller and template
angular
  .module('team.detail')
  .component('teamDetail', {
    templateUrl: 'team/detail/team-detail.template.html',
    controller: ['$routeParams', 'Team', TeamDetailController]
  });

function TeamDetailController($routeParams, Team) {
  var self = this;

  self.team = Team.get({
    teamId: $routeParams.teamId
  });
}
