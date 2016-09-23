'use strict';

angular
  .module('fantasyFootball')
  .config(['$locationProvider' ,'$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/teams', {
          template: '<team-table></team-table>'
        })
        .when('/teams/:teamId', {
          template: '<team-detail></team-detail>'
        })
        .when('/create-team', {
          template: '<team-create></team-create>'
        })
        .when('/create-player', {
          template: '<player-create></player-create>'
        })
        .when('/players', {
          template: '<player-table></player-table>'
        })
        .when('/players/edit/:playerId', {
          template: '<player-edit></player-edit>'
        })
        .when('/players/:playerId', {
          template: '<player-detail player=$resolve.player></player-detail>',
          resolve: {
            player: ['Player', '$route', function(Player, $route) {
              return Player.get({
                playerId: $route.current.params.playerId
              });
            }]
          }
        })
        .otherwise('/players');
    }
  ]);
