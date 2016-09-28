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
          template: '<team-create></team-create>',
          resolve: {
            access: ['Auth', '$q', function(Auth, $q) {
              return Auth.team() ? $q.reject(Auth.UNAUTHORIZED) : Auth.OK;
            }]
          }
        })
        .when('/create-player', {
          template: '<player-create></player-create>',
          resolve: {
            access: ['Auth', '$q', function(Auth, $q) {
              return Auth.player() ? $q.reject(Auth.UNAUTHORIZED) : Auth.OK;
            }]
          }
        })
        .when('/players', {
          template: '<player-table></player-table>'
        })
        .when('/players/edit/:playerId', {
          template: '<player-edit></player-edit>',
          resolve: {
            access: ['Auth', function(Auth) {
              return Auth.isAdmin();
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
            }]
          }
        })
        .when('/login', {
          template: '<login-form></login-form>'
        })
        .when('/register', {
          template: '<register-form></register-form>'
        })
        .otherwise('/players');
    }
  ]).run(['$rootScope', 'Auth', '$location', '$window',
  function($rootScope, Auth, $location, $window) {
    $rootScope.$on('$routeChangeError',
      function(event, current, previous, rejection) {
        if (rejection === Auth.UNAUTHORIZED) {
          $location.path('/login');
        }
      });
    
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.$broadcast('pageLoaded');
    });
      
    $window.onbeforeunload = function() {
      $rootScope.$broadcast('pageRefresh');
    };
  }]);
