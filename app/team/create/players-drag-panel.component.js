'use strict';

angular
  .module('team.create')
  .component('playersDragPanel', {
    templateUrl: 'team/create/players-drag-panel.template.html',
    controller: [PlayersDragPanelController],
    bindings: {
      list: '=',
      title: '<',
      position: '<'
    }
  });

function PlayersDragPanelController() {
}
