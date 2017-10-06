"use strict";


angular.module('clinica')

    .controller('EditItemEscalaDialogController', function ( $scope,$mdDialog,FormatDate, $mdMedia,SERVICE_PATH,  $timeout, RestSrv,  $mdToast, $q,$rootScope, $mdUtil,_item_escala) {




        $scope.medico = [];
        $scope.itemEscala = {};


        $scope.horas =
            [
                '00:00:00','00:15:00','00:30:00','00:45:00',
                '01:00:00','01:15:00','01:30:00','01:45:00',
                '02:00:00','02:15:00','02:30:00','02:45:00',
                '03:00:00','03:15:00','03:30:00','03:45:00',
                '04:00:00','04:15:00','04:30:00','04:45:00',
                '05:00:00','05:15:00','05:30:00','05:45:00',
                '06:00:00','06:15:00','06:30:00','06:45:00',
                '07:00:00','07:15:00','07:30:00','07:45:00',
                '08:00:00','08:15:00','08:30:00','08:45:00',
                '09:00:00','09:15:00','09:30:00','09:45:00',
                '10:00:00','10:15:00','10:30:00','10:45:00',
                '11:00:00','11:15:00','11:30:00','11:45:00',
                '12:00:00','12:15:00','12:30:00','12:45:00',
                '13:00:00','13:15:00','13:30:00','13:45:00',
                '14:00:00','14:15:00','14:30:00','14:45:00',
                '15:00:00','15:15:00','15:30:00','15:45:00',
                '16:00:00','16:15:00','16:30:00','16:45:00',
                '17:00:00','17:15:00','17:30:00','17:45:00',
                '18:00:00','18:15:00','18:30:00','18:45:00',
                '19:00:00','19:15:00','19:30:00','19:45:00',
                '20:00:00','20:15:00','20:30:00','20:45:00',
                '21:00:00','21:15:00','21:30:00','21:45:00',
                '22:00:00','22:15:00','22:30:00','22:45:00',
                '23:00:00','23:15:00','23:30:00','23:45:00'

            ];










        /*Show Toasts*/
        function showCustomErrorToast(status, mensagem) {
            $mdToast.show({
                hideDelay   : 3000, position    : 'top right',
                template : ' <md-toast> <span class="md-toast-text" style="color:#FF5252" flex ng-bind="status"></span> <p class="md-highlight"  flex ng-bind="mensagem"></p></md-toast>'});
        };
        function showCustomSuccessToast(status, mensagem) {
            $mdToast.show({
                hideDelay   : 3000, position    : 'top right',
                template : ' <md-toast> <span class="md-toast-text" style="color:#4caf50" flex >'+status +'</span> <p class="md-highlight"  flex >'+ mensagem +'</p></md-toast>'});

        };
        /* End Show Toasts*/

        $scope.cancelar = function () {
            return $mdDialog.cancel();
        }

        let itemEscalaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_escala_atendimento';


        $scope.salvar = function () {
            if ($scope.itemEscala === undefined) {
                return $mdDialog.cancel();

            } else {

                RestSrv.edit(itemEscalaUrl, $scope.itemEscala, function (status, data) {
                    if (status === 'ok') {

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.Message;

                        showCustomSuccessToast('Sucesso','Item da Escala  atualizado.');

                        return $mdDialog.hide($scope.itemEscala);

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

                return $scope.itemEscala;
            }
        }

        let currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';
        RestSrv.find(currentMedicoUrl, function (status, data) {
            $scope.medico = data[0];
            $scope.dataModificacao = FormatDate.format(new Date());

            angular.extend($scope.itemEscala,_item_escala);

        });





    });