'use strict';
var BASE_URL;
if (window.location.port === "8081" ) {
    BASE_URL = 'http://localhost:8080/api';
}else{
    BASE_URL = window.location.origin + '/api';
}

angular.module('clinica',[
    "ngCookies",
    'ngRoute',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'md.data.table',
    'ngMaterialAccordion',
    'ngStorage',
    'ui.utils.masks',
    'chart.js',
   /* 'mdThemeColors',
    'ModalDatePicker',
    'smDateTimeRangePicker',*/
    'material.components.eventCalendar',
    'checklist-model'

]).constant('SERVICE_PATH', {
    'ROOT_PATH': BASE_URL,
    'PUBLIC_PATH': BASE_URL + '/public',
    'PRIVATE_PATH': BASE_URL + '/private'
})
    .config(function($httpProvider) {

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('httpRequestInterceptor');

})
    .run(function($rootScope,LoginLogoutSrv) {
        $rootScope.authDetails = { name: '', authenticated: false, permissions: [], file: {}};
        LoginLogoutSrv.verifyAuth();
}).run(function($rootScope) {
    $rootScope.statusMenu = false;
}).directive('appFilereader', function(
    $q
) {
    /*
     Diretiva(Coverte uma Imagem em base 64)
     */
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) {return;}

            ngModel.$render = function() {};
            function readFile(file) {
                var deferred = $q.defer();

                var reader = new FileReader();
                reader.onload = function(e) {
                    deferred.resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    deferred.reject(e);
                };
                reader.readAsDataURL(file);

                return deferred.promise;
            }
            element.bind('change', function(e) {
                var element = e.target;
                if(!element.value) {return;}

                element.disabled = true;
                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function(values) {
                        console.log(values);

                        var valuesSplit =  values[0].split(',');

                     var newValues =   {mimeType : valuesSplit[0]
                            , file: valuesSplit[1]}


                        if (element.multiple) {return;}
                        else {
                            console.log(ngModel);
                            ngModel.$setViewValue(newValues);}
                        element.value = null;
                        element.disabled = false;
                    });



            }); //change

        } //link

    };
}).directive('foto', function($q) {
    return {
        /*Template(diretiva de upload de foto)*/

        scope: {
            showfoto: "@",
            mimetypefile:"@",
            model:"="},
        template: '<div layout="column" layout-align="center center" flex> <md-card-avatar><img class="md-user-avatar"  src="../../../img/user.jpg" ng-if="!showfoto" class="avatar" style="width: 100px; height: 100px;"><img class="md-user-avatar"  src="{{mimetypefile}}" ng-if="!!showfoto" class="avatar" style="width: 100px; height: 100px;"> </md-card-avatar><input  id="input-file-id"  type="file" class="ng-hide"  app-filereader   ng-model="model"> <label for="input-file-id"  class="md-button md-raised md-primary">Selecionar Foto</label><md-icon class="ng-scope ng-isolate-scope md-default-theme material-icons">wallpaper</md-icon><span ng-bind="fotoName"></span></div>'

  };



}).config(function($mdDateLocaleProvider) {

    $mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    $mdDateLocaleProvider.days = ['Domingo', 'Segunda', 'Terça','Quarta','Quinta','Sexta','Sabado'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter','Qua','Qui','Sex','Sab'];

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('L');
    };
    $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
        return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
    };
    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
        return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : null;
    };

}) .directive('rg', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function parserRG(rg) {
                if (rg) {
                    rg = rg.replace(/\D/g, "");
                    rg = rg.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
                    ngModelCtrl.$setViewValue(rg);
                    ngModelCtrl.$render();
                    return rg;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(parserRG);
        }
    };
    }).directive('mdHourMinutes', function($q) {
    return {
        /*Template(diretiva time input)*/

        scope: {
            field:'@',
            type: '@',
            message: '@',
            ngModel: '=',
            readOnly: '<', // true or false
            convertdate: '&',
            test: '&'
        },
        template: '<md-input-container md-no-float>' +

        '<input required ' +
        'type="text"' +
        'name="time_{{type}}"' +
        'ng-model="time"' +
        'ng-change="handleInput(); convertdate({fieldData:field,minute:time }); "' +
        'placeholder="{{type}}"' +
        'maxlength="2"' +
        'ng-blur="handleInput(true)"' +
        'ng-keydown="handleKeypress($event); convertdate({fieldData:field,minute:time }); " ng-disabled="readOnly" />' +
        '<span class="md-up-arrow" aria-hidden="true" ng-click="!readOnly && increase(); convertdate({fieldData:field,minute:time });"></span>' +
        '<span class="md-down-arrow" aria-hidden="true" ng-click="!readOnly && decrease(); convertdate({fieldData:field,minute:time });"></span>' +
        '<md-icon><i class="material-icons">&#xE192;</i></md-icon>'+
        '<div class="time-error-messages" ng-messages="$parent.timeForm[\'time_\' + type].$error" role="alert">' +
        '<div ng-message="required">{{message}}</div>' +
        '</div>' +
        '</md-input-container>',

        controller: ["$scope",  function($scope ) {

            function increase(value, min, max, type) {
                var num = parseInt(value);
                if (isNaN(num) || num === max)
                    num = min;
                else
                    num++;
                if (type === 'MM')
                    return format(num);
                return String(num);
            }

            function decrease(value, min, max, type) {
                var num = parseInt(value);
                if (isNaN(num) || num === min)
                    num = max;
                else
                    num--;
                if (type === 'MM')
                    return format(num);
                return String(num);
            }

            function format(num) {
                if (num < 10)
                    return '0' + String(num);
                return String(num);
            }

            function handleInput(value, max, blur, type) {
                var num = parseInt(value);
                if (type === 'HH' && num === 0) {
                    if (num === 0) {
                        return String(num);
                    }
                    return;
                }
                if (num > max)
                    return String(num)[0];
                else if (!isNaN(num)) {
                    if (value.length === 2 || (blur && type === 'MM'))
                        return format(num);
                    return String(num);
                }
            }

            if ($scope.type === "HH") {

                    $scope.min = 0;
                    $scope.max = 23;

            } else {
                $scope.min = 0;
                $scope.max = 59;
            }


            function updateTime(next) {
             // prevent NaN value in input field
                if (isNaN(next))
                    return;

               


                    $scope.time = next;



            }


            $scope.increase = function() {
                var next = increase($scope.time, $scope.min, $scope.max, $scope.type)
                $scope.time = next;
                updateTime(parseInt(next));

            }

            $scope.decrease = function() {
                var next = decrease($scope.time, $scope.min, $scope.max, $scope.type);
                $scope.time = next;
                updateTime(parseInt(next));

            }

            $scope.handleInput = function(blur) {
                var next = handleInput($scope.time, $scope.max, blur, $scope.type);
                if(next === NaN || next == undefined){
                    $scope.time = '';
                }else{
                    $scope.time = next;
                    updateTime(parseInt(next));
                }


            }

            $scope.handleKeypress = function(ev) {
                if (ev.keyCode === 38) $scope.increase();
                else if (ev.keyCode === 40) $scope.decrease();
            }

        }]


        }

    });



