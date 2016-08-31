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
        .when('/', {
          template: '<user-form></user-form>'
        })
        .otherwise('/');
    }
  ]);

function run($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (notLoggedInView() && !AuthService.isLoggedIn()) {
      $location.path('/login');
    }
  });
}

function notLoggedInView() {
  return !($location.path() === '/login' || $location.path() === '/signup');
}
