(function () {
  'use strict';

  angular.module('app')
  .service('user', userService)
  .service('auth', authService);

  const api = 'http://test-routes.herokuapp.com';

  function userService($http) {
    var self = this;
    self.signup = function (username, password) {
      return $http.post(api + '/auth/register', {
        username: username,
        password: password,
      })
    },
    self.login = function (username, password) {
      return $http.post(api + '/auth/login', {
        username: username,
        password: password,
      })
    }
  }

  function authService($window) {
    var self = this;
    self.parseJwt = function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }
    self.saveToken = function(token) {
      $window.localStorage['jwtToken'] = token;
    }
    self.getToken = function() {
      return $window.localStorage['jwtToken'];
    }
    self.isAuthed = function() {
      var token = self.getToken();
      if (token) {
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }
    self.logout = function() {
      $window.localStorage.removeItem('jwtToken');
    }
  }
})()
