"use strict";


angular.module('clinica')
    .controller('NewConvenioDialogController', function (
        $scope,$mdDialog,$mdMedia,_addConvenio,$http,
        SERVICE_PATH,RestSrv,$mdToast,FormatDate,FindCep,_convenio_aux,$timeout) {

        $scope.tabIndex = 0;


        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';

        $scope.medico = {};
        $scope.medicos = [];
        $scope.convenio = {};



        $scope.getEnuns = function() {

            RestSrv.find(medicoUrl, function (status, data) {
                $scope.medicos = data.data;
                console.log(data);

            });
            



        }






        var mdDialog = $mdDialog;



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

        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        };
        var convenioUrl = SERVICE_PATH.PRIVATE_PATH + '/convenio';
        $scope.salvar = function() {
            console.log('ola');
            if($scope.convenio === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(convenioUrl, $scope.convenio, function(status,data) {

                    if(status ==='ok'){
                        //$scope.convenios.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;
                        console.log(data);


                        showCustomSuccessToast('Sucesso','convenio(a) \'' + $scope.convenio.nomeFantasia + '\' adicionado(a).');
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

               // return  $mdDialog.hide($scope.convenio);
                return $scope.convenio;
            }


        }

        

    });