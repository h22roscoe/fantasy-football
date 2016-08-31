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
      .success(function(data) {
        user = data.user;
      }, function(err) {
        user = false;
      });
  }

  function login(user) {
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/login', user)
      .then(function(data) {
        user = data.user;
        deferred.resolve();
      }, function(err) {
        user = false;
        deferred.reject();
      });

    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();

    // Send a get request to the server
    $http.get('/logout')
      .then(function(data) {
        user = false;
        deferred.resolve();
      }, function(err) {
        user = false;
        deferred.reject();
      });

    return deferred.promise;
  }

  function register(username, password) {
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/register', user)
      .then(function(data) {
        deferred.resolve();
      }, function(err) {
        deferred.reject();
      });

    // return promise object
    return deferred.promise;
  }
}
