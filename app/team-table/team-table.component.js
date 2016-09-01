'use strict';

// Register `teamTable` component, along with its associated controller and template
angular
  .module('teamTable')
  .component('teamTable', {
    templateUrl: 'team-table/team-table.template.html',
    controller: ['Team',
      function TeamListController(Team) {
        this.teams = Team.query();
        this.orderProp = 'points';
      }
    ]
  });
