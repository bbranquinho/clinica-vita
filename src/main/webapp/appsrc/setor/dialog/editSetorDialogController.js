"use strict";

angular.module('clinica')
    .controller('EditSetorDialogController', function ($scope,$mdDialog,RestSrv,SERVICE_PATH,$mdToast, $rootScope ,_editarSetor) {


        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];


        $scope.editarSetor = [];
        //$scope.fabricanteEdit =  angular.copy(fabricanteEdit);
        $scope.editarSetor = angular.copy(_editarSetor[0]);
        console.log(_editarSetor[0]);

        
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
            if($scope.editarSetor === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.edit(setorUrl, $scope.editarSetor, function(status,data) {

                    if(status ==='ok'){
                        //$scope.setores.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                       // openToast('setor \'' + setor.nome + '\' added.', 'success');
                        showCustomSuccessToast('Sucesso','setor \'' + $scope.editarSetor.nome + '\' atualizado(a).');
                        return  $mdDialog.hide($scope.editarSetor);
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

               return $scope.editarSetor;
            }


        }


    });