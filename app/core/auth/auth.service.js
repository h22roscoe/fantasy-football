'use strict';

angular
  .module('core.auth')
  .factory('AuthService', ['$q', '$http', AuthService]);

function AuthService($q, $http) {
  var user = null;

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
    if (user) {
      return Access.OK;
    } else {
      return $q.reject(Access.UNAUTHORIZED);
    }
  }

  function isAdmin() {
    if (user && user.admin) {
      return Access.OK;
    } else {
      return $q.reject(Access.UNAUTHORIZED);
    }
  }

  function login(credentials) {
    // Send a post request to the server
    return $http.post('/login', credentials)
      .then(function success(res) {
        user = res.data.user;
        return res.data;
      }, function error(res) {
        user = false;
        return res.data;
      });
  }

  function register(credentials) {
    // Send a post request to the server
    return $http.post('/register', credentials)
      .then(function success(res) {
        user = res.data.user;
        return res.data;
      }, function error(res) {
        user = false;
        return res.data;
      });
  }

  function logout() {
    // Send a get request to the server
    return $http.get('/logout')
      .then(function success() {
        user = false;
        return user;
      });
  }
}
