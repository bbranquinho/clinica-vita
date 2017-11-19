

"use strict";

angular.module('clinica')

    .controller('NewAgendamentoDialogController',function ( $scope, $mdMedia,FormatDate, $mdToast,RestSrv,SERVICE_PATH,_itensAgenda,$mdDialog) {
        var mdDialog = $mdDialog;
        $scope.itemAgenda = _itensAgenda;

        $scope.paciente = {};
        $scope.setPaciente = function(elements){
            if(elements != null) {
                $scope.itemAgenda.paciente  = elements;
                console.log( $scope.itemAgenda.paciente);
            }

        }


        $scope.pacientes = [];
        var pacienteUrl = SERVICE_PATH.PRIVATE_PATH +'/paciente/findByStatus/Ativo' ;

        console.log(pacienteUrl);

        RestSrv.find(pacienteUrl, function(status,data) {


            $scope.pacientes = data.data;



        });

        $scope.cancelar = function(){

            return $mdDialog.cancel();

        };

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


        var itemAgendaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda';
        $scope.salvar = function() {


            //$scope.itemAgenda.paciente = $scope.paciente;
            //console.log( $scope.itemAgenda);
            if($scope.itemAgenda === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.edit(itemAgendaUrl, $scope.itemAgenda, function(status,data) {

                    if(status ==='ok'){
                        //$scope.medicos.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                        showCustomSuccessToast('Sucesso','Solicitação de Agendamento \'' + $scope.itemAgenda.agenda.dataHoraInicialConsulta + '\' concluida.');
                        return  $mdDialog.hide($scope.itemAgenda);
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



            }


        }



    });


