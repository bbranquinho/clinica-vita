'use strict';


angular.module('clinica')
    .service('LoginLogoutSrv', function ($http, $cookies, $rootScope, $location, $localStorage, SERVICE_PATH,$mdToast) {
        var serviceFactory = {};
        var urlLogin  = SERVICE_PATH.PUBLIC_PATH + '/login';
        var urlLogout = SERVICE_PATH.PUBLIC_PATH + '/logout';

        serviceFactory.login = function(email, password) {
            var requestParams = {
                method: 'GET',
                url: urlLogin,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : 'Basic ' + btoa(email + ':' + password)
                }
            };

            $http(requestParams).then(
                function success(response) {
                    var data = response.data;

                    if (data.name) {
                        $rootScope.authDetails = { name: data.name, authenticated: data.authenticated, permissions: data.authorities, file: data.principal.file};
                        $localStorage.authDetails = $rootScope.authDetails;
                        $location.path('/home');
                        $mdToast.show($mdToast.simple().textContent('Bem Vindo ' + data.name + '.', 'success').position('top right').hideDelay(3000));
                       // ngNotify.set('Welcome ' + data.name + '.', 'success');
                    } else {
                        $rootScope.authDetails = { name: '', authenticated: false, permissions: [] , file: {}};
                        $mdToast.show($mdToast.simple().textContent('Email ou senha inválido.', 'error').position('top right').hideDelay(3000));
                       // ngNotify.set('Email or password that you have entered do not match our records.', { type: 'failure', duration: 5000 });
                    }
                },
                function failure() {
                    $rootScope.authDetails = { name: '', authenticated: false, permissions: [], file: {}};
                    $mdToast.show($mdToast.simple().textContent('Email ou senha inválido.', 'error').position('top right').hideDelay(3000));
                   // ngNotify.set('Email or password that you have entered do not match our records.', { type: 'failure', duration: 5000 });
                }
            );

            if($rootScope.authDetails.name ==''){
               return false;
            }
                return true;

        };

        serviceFactory.logout = function() {
            var requestParams = {
                method: 'POST',
                url: urlLogout,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(requestParams).finally(function success() {
                delete $localStorage.authDetails;
                $rootScope.authDetails = { name: '', authenticated: false, permissions: [] , file: {} };
                $location.path('/');
            });
        };

        serviceFactory.verifyAuth = function() {
            if ($localStorage.authDetails) {
                $rootScope.authDetails = $localStorage.authDetails;
            }
        };

        return serviceFactory;
    });

