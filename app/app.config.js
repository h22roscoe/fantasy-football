'use strict';

angular
  .module('fantasyFootball')
  .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/teams', {
          template: '<team-table></team-table>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }],
          }
        })
        .when('/teams/:teamId', {
          template: '<team-detail></team-detail>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }],
          }
        })
        .when('/players', {
          template: '<player-table></player-table>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }],
          }
        })
        .when('/players/:playerId', {
          template: '<player-detail></player-detail>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }],
          }
        })
        .when('/login', {
          template: '<login-form></login-form>'
        })
        .when('/register', {
          template: '<register-form></register-form>'
        })
        .otherwise('/login');
    }
  ])
  .run(['$rootScope', 'AuthService', '$location',
    function($rootScope, AuthService, $location) {
      $rootScope.$on('$routeChangeError',
        function(event, current, previous, rejection) {
          if (rejection == AuthService.UNAUTHORIZED) {
            $location.path('/login');
          }
        });
    }]);;
