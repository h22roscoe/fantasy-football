'use strict';

angular
  .module('core.auth')
  .factory('AuthService', ['$http', '$q', AuthService]);

function AuthService($http, $q) {
  // Create user variable
  var user = null;

  // Return available functions for use in the controllers
  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register
  });

  function isLoggedIn() {
    return user;
  }

  function getUserStatus() {
    return $http.get('/users/me')
      .success(function success(res) {
        user = res.data.user;
      }, function error(res) {
        user = false;
      });
  }

  function login(credentials) {
    // send a post request to the server
    return $http.post('/login', credentials)
      .then(function success(res) {
        user = res.data.user;
      }, function error(res) {
        user = false;
      });
  }

  function logout() {
    // Send a get request to the server
    return $http.get('/logout')
      .then(function success(res) {
        user = false;
      });
  }

  function register(credentials) {
    // send a post request to the server
    return $http.post('/register', credentials)
      .then(function success(res) {
        deferred.resolve();
      }, function error(res) {
        deferred.reject();
      });
  }
}
