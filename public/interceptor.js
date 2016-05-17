(function () {
  'use strict';

  angular.module('app')
  .factory('authInterceptor', authInterceptor)
  .config(intercept)

  const api = 'http://test-routes.herokuapp.com';

  function authInterceptor($log, auth){
    return {
      request: function (config) {
        console.log('config: ', config);
        var token = auth.getToken();
        if (config.url.indexOf(api) == 0 && token)
          config.headers.Authorization = 'Bearer' + token;
        return config;
      },
      response: function (res) {
        console.log('res: ', res);
        if (res.config.url.indexOf(api) == 0 && res.data.token)
          auth.saveToken(res.data.token);
        return res;
      },
      requestError: function (err) {
        $log.error('req err: ', err)
        return err;
      },
      responseError: function (err) {
        $log.error('res err:', err)
        return err;
      },
    }
  }

  function intercept($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

})()
