'use strict';

angular
  .module('fantasyFootball')
  .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/teams', {
          template: '<team-table></team-table>'
        })
        .when('/teams/:teamId', {
          template: '<team-detail></team-detail>'
        })
        .when('/players', {
          template: '<player-table></player-table>'
        })
        .when('/players/:playerId', {
          template: '<player-detail></player-detail>'
        })
        .when('/login', {
          template: '<login-form></login-form>'
        })
        .when('/register', {
          template: '<register-form></register-form>'
        })
        .otherwise('/login');
    }
  ]);
