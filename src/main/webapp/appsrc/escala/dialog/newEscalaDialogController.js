"use strict";


angular.module('clinica')

    .controller('NewEscalaDialogController', function ($mdDialog, $scope, $mdMedia, $mdToast, RestSrv, SERVICE_PATH, $rootScope, $mdUtil) {






        /*show/hide columns*/
        $scope.indeter = false;
        $scope.columns = [
            {status: true, name: 'Segunda-Feira'},
            {status: true, name: 'Terça-Feira'},
            {status: true, name: 'Quarta-Feira'},
            {status: true, name: 'Quinta-Feira'},
            {status: true, name: 'Sexta-Feira'},
            {status: true, name: 'Sábado'},
            {status: true, name: 'Domingo'}


        ];

        $scope.horarios =
            {manha:['08:00','09:00','10:00'],
             tarde:['13:00','14:00','15:00']};

        $scope.intervalo = false;

        $scope.selected = [];

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.cancelar = function () {
            return $mdDialog.cancel();
        }

        var escalaUrl = SERVICE_PATH.PRIVATE_PATH + '/escala';


        $scope.salvar = function () {
            if ($scope.escala === undefined) {
                return $mdDialog.cancel();

            } else {

                RestSrv.add(escalaUrl, $scope.escala, function (status, data) {
                    if (status === 'ok') {

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.Message;

                        return $mdDialog.hide(data.data);

                    } else {
                        $scope.statusError = 'unsuccess';
                        $scope.messages = data.fildsErrorMessages;
                        if (data.message != null || data.message != undefined) {
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }
                });

                return $scope.escala;
            }
        }
    });