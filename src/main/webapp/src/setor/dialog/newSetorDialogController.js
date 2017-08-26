"use strict";

angular.module('clinica')
    .controller('NewSetorDialogController', function ($scope,RestSrv,$mdToast,SERVICE_PATH,$mdDialog) {


        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];



        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        };

        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';

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
            console.log('ola');
            if($scope.setor === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(setorUrl, $scope.setor, function(status,data) {

                    if(status ==='ok'){

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                      //  openToast('setor \'' + setor.nome + '\' added.', 'success');
                        showCustomSuccessToast('Sucesso','setor \'' + $scope.setor.nome + '\' adicionado.');
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
                return $scope.setor;
            }


        }


    });