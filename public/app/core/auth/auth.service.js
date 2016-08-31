'use strict';

angular
  .module('core.auth')
  .service('AuthService', ['$http', '$window', AuthService]);

function AuthService($http, $window) {
  return {
    currentUser: currentUser,
    saveToken: saveToken,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    register: register,
    login: login,
    logout: logout
  };

  function saveToken(token) {
    $window.localStorage.token = token;
  };

  function getToken() {
    return $window.localStorage.token;
  };

  function isLoggedIn() {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split('.')[1];

      // atob works on modern browsers to parse a base64 encoding.
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  function currentUser() {
    if (isLoggedIn()) {
      return $http.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      });
    }
  };

  function register(user) {
    return $http.post('/register', user)
      .success(function(data) {
        saveToken(data.token);
      });
  };

  function login(user) {
    return $http.post('/login', user).success(function(data) {
      saveToken(data.token);
    });
  };

  function logout() {
    $window.localStorage.removeItem('token');
  };
}
