'use strict';

angular.module('clinica')



    .service('UserService', function () {

        var selected = [];

        var users = [
            {
                name: 'Erick Riley',
                avatar: 'svg-1',
                bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
                notes: [
                    { title: "Pay back dinner", date: new Date("2016-01-12") },
                    { title: "Buy flowers for birthday", date: new Date("2016-01-19") }
                ]
            },
            {
                name: 'Levi Neal',
                avatar: 'svg-2',
                bio: 'Won\'t light from great first years without said creepeth a two and fly forth subdue the, don\'t our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won\'t Dry. Moved. Sea fowl earth fourth.',
                notes: []
            },
            {
                name: 'Sandy Armstrong',
                avatar: 'svg-3',
                bio: 'Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn\'t all of cattle Won\'t doesn\'t beginning days from saw, you\'re shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.',
                notes: []
            },
            {
                name: 'Marcia	Higgins',
                avatar: 'svg-4',
                bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                notes: []
            }
        ];

        return {
            loadAllUsers: function () {
                return users;
            },
            setSelected: function(user) {
                selected = user;
            },
            getSelected: function() {
                return selected;
            }


        };



    }).service('HttpRequestSrv', function($http, $mdToast) {
    return function(url, method, data, callback) {
        var requestParams = {
            method: method,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: data
        };

        $http(requestParams).then(
        function successCallback(response) {
            callback('ok',response.data);
        },
        function errorCallback(response) {
            if(response.data !== null){

                $mdToast.show({
                    hideDelay   : 10000, position    : 'top right',
                    template : ' <md-toast> <span class="md-toast-text" style="color:#FF5252" flex>Erro:</span> <p class="md-highlight"  flex>Operação não realizada!</p></md-toast>'});


                //$mdToast.show($mdToast.simple().textContent('Error: ' + response.data + '.', 'error').position('top right').hideDelay(3000));

                // ngNotify.set('Error: ' + response.data.fieldsErrorMessages[0] + '.', 'error');
                //openToast('Error: ' + response.data.fieldsErrorMessages[0] + '.', 'error');

                callback('error',response.data);
            }
        });
};
})
    .service('RestSrv', function(HttpRequestSrv) {
        var restFactory = {};

        // Find all data.
        restFactory.find = function(url, callback) {
            new HttpRequestSrv(url, 'GET', {}, callback);
        };

        restFactory.findById = function(url, callback) {
            new HttpRequestSrv(url, 'GET', {}, callback);
        };

        restFactory.findByRole = function(url,callback) {
            new HttpRequestSrv(url, 'GET', {}, callback);
        };

        // Add a new data.
        restFactory.add = function(url, data, callback) {
            new HttpRequestSrv(url, 'POST', data, callback);
        };

        // Edit a data.
        restFactory.edit = function(url, data, callback) {
            new HttpRequestSrv(url, 'PUT', data, callback);
        };

        // Delete a data.
        restFactory.delete = function(url, data, callback) {
            new HttpRequestSrv(url, 'DELETE', data, callback);
        };

        return restFactory;
    }).service('StrToDate', function() {
            /*converte uma string (dd/MM/yyyy) em data*/
            return{
                 stringToDate: function(dateString){
                var dateNasc = dateString.split('/');

                    var  day = dateNasc[0];
                    var month = dateNasc[1];
                    var year = dateNasc[2];

                    return new Date(year + '/' + month + '/' + day);

                 }
            }

}) .service('FormatDate', function() {
    return {
        format: function(date) {

            var d = date,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }


            return [day, month, year].join('/');
        }
    }
}) .service('FormatBDate', function() {
    return {
        format: function(date) {

            var d = date,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }


            return [day, month, year].join('-');
           
        }
    }
}) .service('FormatDateAgenda', function() {
    return {
        format: function(date) {

            var d = date,
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }


            return [day, month, year].join('/');

        }
    }
}).service('FindCep', function($http) {
    return {
        buscacpf: function(cep) {
            var _cep = cep;

            if (_cep.indexOf('-') > -1) {
                var vet = cep.split('-');
                _cep = vet[0] + vet[1];
            }

            return $http({
                method: 'GET',
                url: 'https://viacep.com.br/ws/' + _cep + '/json/'
            }).then(function (response) {
                return response.data;
            }).catch(function(error){
                // do something with error
                throw error;
            });

        }
    }
});