"use strict";

angular.module('clinica')
    .controller('EditConvenioDialogController', function (
        $scope,$mdDialog,$mdMedia, $rootScope ,_editarConvenio,_editConvenio,
        $http,SERVICE_PATH,RestSrv,$mdToast,StrToDate,FormatDate,FindCep,_editarconvenio_aux) {


        $scope.tabIndex = 0;

        //$scope.buttonTab = false;
        $scope.editarConvenio = {};

        if(_editarconvenio_aux != null) {
            $scope.editarConvenio = _editarconvenio_aux;
        }


        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';

        $scope.medico = {};
        $scope.medicos = [];
        $scope.editarConvenio = [];


        //var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';





        $scope.getEnuns = function() {



            RestSrv.find(medicoUrl, function (status, data) {
                $scope.medicos = data.data;
                console.log(data);

            });




            $scope.editarConvenio = angular.copy(_editarConvenio[0]);
            console.log('editarConvenio:');
            console.log( $scope.editarConvenio);
        }





        var mdDialog = $mdDialog;

        $scope.cancelar = function(){
           
            return $mdDialog.cancel();

        }


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

            return $mdDialog.cancel();

        };
        var convenioUrl = SERVICE_PATH.PRIVATE_PATH + '/convenio';

        $scope.salvar = function() {

            if($scope.editarConvenio === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.edit(convenioUrl, $scope.editarConvenio, function(status, data){
                    if(status ==='ok'){



                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;
                        showCustomSuccessToast('Sucesso','convenio(a) \'' + $scope.editarConvenio.nomeFantasia + '\' editado(a).');

                        return  $mdDialog.hide($scope.editarConvenio);
                    }else{
                        $$scope.statusError = 'unsuccess';
                        $scope.messages = data.fieldsErrorMessages;
                        if(data.message != null || data.message != undefined){
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }


                });

                return  $scope.editarConvenio;
            }


        }


        var _convenio = $scope.editarConvenio;





    });