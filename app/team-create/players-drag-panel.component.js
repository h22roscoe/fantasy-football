'use strict';

angular
  .module('teamCreate')
  .component('playersDragPanel', {
    templateUrl: 'team-create/players-drag-panel.template.html',
    controller: [PlayersDragPanelController],
    bindings: {
      list: '=',
      title: '<',
      position: '<'
    }
  });

function PlayersDragPanelController() {
}
