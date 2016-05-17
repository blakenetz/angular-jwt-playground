(function () {
  'use strict';
  
  angular.module('app')
  .controller('Main', MainCtrl)

  function MainCtrl(user, auth) {
    var self = this;

    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if (token) console.log('JWT:', token);
      self.message = res.data.message;
    }

    self.login = function () {
      user.login(self.username, self.password)
      .then(handleRequest, handleRequest)
    }
    self.signup = function () {
      user.signup(self.username, self.password)
      .then(handleRequest, handleRequest)
    }
    self.getQuote = function () {
      user.getQuote()
      .then(handleRequest, handleRequest)
    }
    self.logout = function () {
      auth.logout && auth.logout();
    }
    self.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    }
  }

})();
