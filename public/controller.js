(function () {
  'use strict';

  angular.module('app')
  .controller('Main', MainCtrl)

  function MainCtrl($http, $log, user, auth) {
    var vm = this;

    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if (token) $log.info('JWT:', token);
      vm.message = res.data.message;
    }

    vm.login = function () {
      user.login(vm.username, vm.password)
      .then(handleRequest, handleRequest)
    }
    vm.signup = function () {
      user.signup(vm.username, vm.password)
      .then(handleRequest, handleRequest)
    }
    vm.logout = function () {
      auth.logout();
      vm.message = 'logout successful!';
    }
    vm.isAuthed = function () {
      return auth.isAuthed ? auth.isAuthed() : false;
    }
  }

})();
