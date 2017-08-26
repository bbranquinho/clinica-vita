'use strict';

angular.module('clinica')
    .service('httpRequestInterceptor', function ($cookies) {
        return {
            request: function (config) {

               if(config.url.indexOf('https://viacep.com') > - 1){
                    config.headers = {};
                   config.withCredentials = false;
                    return config;
                }


               config.headers['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');
                return config;
            }
        };
    });
