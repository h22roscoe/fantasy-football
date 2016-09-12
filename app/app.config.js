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
            }]
          }
        })
        .when('/teams/:teamId', {
          template: '<team-detail></team-detail>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }]
          }
        })
        .when('/create', {
          template: '<team-create></team-create>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }]
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
        .when('/players/edit/:playerId', {
          template: '<player-edit></player-edit>',
          resolve: {
            access: ['AuthService', function(AuthService) {
              return AuthService.isAdmin();
            }]
          }
        })
        .when('/players/:playerId', {
          template: '<player-detail player=$resolve.player></player-detail>',
          resolve: {
            player: ['Player', '$route', function(Player, $route) {
              return Player.get({
                playerId: $route.current.params.playerId
              });
            }],
            access: ['AuthService', function(AuthService) {
              return AuthService.isLoggedIn();
            }]
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
