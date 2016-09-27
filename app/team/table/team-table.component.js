'use strict';

// Register `teamTable` component, along with its associated controller and template
angular
  .module('team.table')
  .component('teamTable', {
    templateUrl: 'team/table/team-table.template.html',
    controller: ['Team', TeamTableController]
  });

function TeamTableController(Team) {
  this.teams = Team.query();
  this.orderProp = 'points';
}
