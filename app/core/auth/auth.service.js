'use strict';

angular
  .module('core.auth')
  .factory('AuthService', ['$http', '$log', AuthService]);

function AuthService($http, $log) {
  // Create user variable
  var user = null;

  // Return available functions for use in the controllers
  return {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    register: register
  };

  function isLoggedIn() {
    return user;
  }

  function login(credentials) {
    // send a post request to the server
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
    // send a post request to the server
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
      .then(function success(res) {
        user = false;
        return user;
      });
  }
}
