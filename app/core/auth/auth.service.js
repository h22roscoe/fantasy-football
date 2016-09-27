'use strict';

angular
  .module('core.auth')
  .factory('Auth', ['$q', '$http', 'Me', Auth]);

function Auth($q, $http, Me) {
  // Return available functions for use in the controllers
  var Access = {
    OK: 200,
    UNAUTHORIZED: 401,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    login: login,
    logout: logout,
    register: register
  };

  return Access;

  function isLoggedIn() {
    if (Me.loggedIn) {
      return Access.OK;
    } else {
      return $q.reject(Access.UNAUTHORIZED);
    }
  }

  function isAdmin() {
    if (Me.loggedIn && Me.admin) {
      return Access.OK;
    } else {
      return $q.reject(Access.UNAUTHORIZED);
    }
  }

  function login(credentials) {
    // Send a post request to the server
    return $http.post('/login', credentials)
      .then(function success(res) {
        Me.loggedIn = true;
        Me.admin = res.user.admin;
        Me.team = res.user.team;
        Me.player = res.user.player;
        Me.username = res.user.username;
        return res;
      }, function error(res) {
        Me.loggedIn = false;
        Me.admin = false;
        Me.username = null;
        return res;
      });
  }

  function register(credentials) {
    // Send a post request to the server
    return $http.post('/register', credentials)
      .then(function success(res) {
        Me.loggedIn = true;
        Me.admin = res.user.admin;
        Me.username = res.user.username;
        return res;
      }, function error(res) {
        Me.loggedIn = false;
        Me.admin = false;
        Me.username = null;
        return res;
      });
  }

  function logout() {
    // Send a get request to the server
    return $http.get('/logout')
      .then(function success() {
        Me.loggedIn = false;
        Me.admin = false;
        Me.username = null;
      });
  }
}
