"use strict";

angular.module('clinica')
    .controller('NewCargoDialogController', function ($scope,$mdToast,$mdDialog,RestSrv,SERVICE_PATH) {


        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];



        $scope.cancelar = function(){
            console.log("oi");
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

            if($scope.cargo === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(cargoUrl, $scope.cargo, function(status,data) {

                    if(status ==='ok'){
                       
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;



                        showCustomSuccessToast('Sucesso','cargo \'' + $scope.cargo.nome + '\' adicionado(a).');
                        return  $mdDialog.hide(data.data);
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

                return $scope.cargo;
            }


        }


    });