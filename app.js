(function () {

  angular.module('app', [])
  .factory('authInterceptor', userService)
  .service('user', userService)
  .service('auth', authService)
  .constant('api', 'http://test-routes.herokuapp.com')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  })
  .controller('Main', mMinCtrl)

  function authInterceptor(api, auth){
    return{
      request: function (config) {
        return config;
      },
      response: function (res) {
        return res;
      },
    }
  }

  function authService($window) {
    var self = this;
  }

  function userService($http, api, auth) {
    var self = this;
    self.getQuote = function () {
      return $http.get(api + '/auth/quote')
    }
  }

  function MainCtrl(user, auth) {
    var self = this;

    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if (token) console.log('jwt: ', token);
      self.message = res.data.message;
    }

    self.login = function () {
      user.login(self.username, self.password)
      .then(handleRequest, handleRequest)
    },
    self.register = function () {
      user.register(self.username, self.password)
      .then(handleRequest, handleRequest)
    },
    self.getQuote = function () {
      user.getQuote()
      .then(handleRequest, handleRequest)
    },
    self.logout = function () {
      auth.logout && auth.logout();
    },
    self.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    }
  }

})()
