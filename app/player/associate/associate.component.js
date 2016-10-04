angular
  .module('player.associate')
  .component('playerAssociate', {
    templateUrl: 'player/associate/associate.template.html',
    controller: ['$location', 'Player', 'User', PlayerAssociateCtrl]
  });

function PlayerAssociateCtrl($location, Player, User) {
  var self = this;
  
  self.alerts = [];

   self.addAlert = function(msg, type) {
    self.alerts.push({
      msg: msg,
      type: type
    });
  };

  self.closeAlert = function(index) {
    self.alerts.splice(index, 1);
  };
  
  self.players = Player.query();
  
  self.noOwner = function(player) {
    return !player.owner;
  }
  
  self.onSubmit = function() {
    if (self.associateForm.$valid) {
      User.addPlayer(self.player).then(function() {
        $location.path('/players');
      });
    } else {
      self.addAlert('You must select yourself from the list first.');
    }
  }
}