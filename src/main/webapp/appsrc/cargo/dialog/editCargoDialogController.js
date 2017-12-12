"use strict";

angular.module('clinica')
    .controller('EditCargoDialogController', function ($scope,$mdToast,$mdDialog,RestSrv,SERVICE_PATH, $rootScope ,_editarCargo) {


        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];


        $scope.editarCargo = [];
        //$scope.fabricanteEdit =  angular.copy(fabricanteEdit);
        $scope.editarCargo = angular.copy(_editarCargo[0]);
        console.log(_editarCargo[0]);

        
        $scope.cancelar = function(){

            return $mdDialog.cancel();

        };


        var cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';

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


        $scope.salvar = function() {

            if($scope.editarCargo === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.edit(cargoUrl, $scope.editarCargo, function(status, data){
                    if(status ==='ok'){



                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                        showCustomSuccessToast('Sucesso','cargo \'' + $scope.editarCargo.nome + '\' atualizado(a).');
                        return  $mdDialog.hide($scope.editarCargo);


                    }else{
                        $scope.statusError = 'unsuccess';
                        $scope.messages = data.fieldsErrorMessages;
                        if(data.message != null || data.message != undefined){
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }


                });
                return $scope.editarCargo;

            }


        }


    });