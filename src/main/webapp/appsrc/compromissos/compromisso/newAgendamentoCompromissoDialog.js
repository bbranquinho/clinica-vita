

"use strict";

angular.module('clinica')

    .controller('NewAgendamentoCompromissoDialogController',function ( $scope, $mdMedia,FormatDate, $mdToast,RestSrv,SERVICE_PATH,_itensAgenda,$mdDialog) {
        var mdDialog = $mdDialog;
        $scope.itemAgenda = _itensAgenda;

        $scope.paciente = {};

        var userUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';

        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);


            var currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findById/' + $scope.user[0].id;
            RestSrv.find(currentPacienteUrl, function (status, data) {
                console.log(data);
                $scope.paciente = data.data;

                $scope.itemAgenda.paciente = $scope.paciente;

            });

        });

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



            console.log($scope.itemAgendaAux);


            $scope.itemAgenda.paciente = $scope.paciente;
            $scope.itemAgendaAux = {};
            $scope.itemAgendaAux.id = $scope.itemAgenda.id;
            $scope.itemAgendaAux.medico = $scope.itemAgenda.medico;
            $scope.itemAgendaAux.agenda = $scope.itemAgenda.agenda;
            $scope.itemAgendaAux.paciente = $scope.itemAgenda.paciente;
            $scope.itemAgendaAux.valorConsulta = $scope.itemAgenda.valorConsulta;
            $scope.itemAgendaAux.tipoAgenda = $scope.itemAgenda.tipoAgenda;
            $scope.itemAgendaAux.statusAgenda = $scope.itemAgenda.statusAgenda;

            console.log( $scope.itemAgendaAux);
            if($scope.itemAgendaAux === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.edit(itemAgendaUrl, $scope.itemAgendaAux, function(status,data) {

                    if(status ==='ok'){
                        //$scope.medicos.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                        showCustomSuccessToast('Sucesso','Solicitação de Agendamento \'' + $scope.itemAgendaAux.agenda.dataHoraInicialConsulta + '\' concluida.');
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
                
            }

        }

    });


