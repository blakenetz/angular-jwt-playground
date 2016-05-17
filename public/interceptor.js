(function () {
  'use strict';

  angular.module('app')
  .factory('authInterceptor', authInterceptor)
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  })

  const api = 'http://test-routes.herokuapp.com';

  function authInterceptor(auth){
    return{
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
    }
  }
})
