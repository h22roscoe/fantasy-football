'use strict';

// Register `teamTable` component, along with its associated controller and template
angular
  .module('team.table')
  .component('teamTable', {
    templateUrl: 'team/table/team-table.template.html',
    controller: ['Team', 'Auth', TeamTableController]
  });

function TeamTableController(Team, Auth) {
  var self = this;

  self.isLoggedIn = Auth.isLoggedIn() === Auth.OK;
  self.team = Auth.team;

  self.teams = Team.query();
  self.orderProp = 'points';
}
