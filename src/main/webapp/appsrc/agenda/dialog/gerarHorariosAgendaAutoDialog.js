

"use strict";

angular.module('clinica')

    .controller('GerarHorariosAgendaAutoDialog',function ( $mdDialog, $scope, $mdMedia,FormatDate, $mdToast,RestSrv,SERVICE_PATH,$timeout) {
        //$scope.calendarEvent = _events;
        // alert($scope.calendarEvent);


        $scope.medico = {};
        $scope.medicos = [];
        $scope.periodoAgendamento = {};
        $scope.periodoInicialConsulta = null;
        $scope.periodoFinalConsulta = null;



        $scope.statusDataFinalConsulta = true;

        //$scope.dataInicialConsulta = _events;
        //$scope.itemAgenda.medico = _medico;

        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        };

        /*Data Minima e Maxima para Agendamento*/
        Date.prototype.addDias = function(dias){
            this.setDate(this.getDate() + dias)
        };

        var dias = 7;
        $scope.dataMinimaInicial  = new Date();
        $scope.dataMinimaInicial.addDias(1);
        $scope.dataMaximaInicial = new Date();
        $scope.dataMaximaInicial.addDias(dias);
        $scope.dataMinimaInicialFinal = new Date();
        $scope.dataMinimaInicialFinal.addDias(1);
        /*--Fim Data Minima e Maxima para Agendamento*/











        var horaInicial,horaFinal,minutoInicial,minutoFinal;
        $scope.formattimepiker = function(fieldData,time) {








            /*se a dataInicial for diferente de null, ela será a dataMinima da dataFinal*/
            if($scope.periodoInicialConsulta != null && $scope.periodoInicialConsulta!= undefined ){
                $scope.statusDataFinalConsulta = false;
                $scope.dataMinimaInicialFinal = $scope.periodoInicialConsulta;

                console.log("é maior");
            }
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

        $scope.salvar = function() {



            if($scope.periodoAgendamento === undefined){
                return $mdDialog.cancel();
            }else{
                $scope.periodoAgendamento.periodoInicial = FormatDate.format($scope.periodoInicialConsulta);
                $scope.periodoAgendamento.periodoFinal = FormatDate.format($scope.periodoFinalConsulta);
                $scope.periodoAgendamento.medicoId = $scope.elements.medico.id;

                let itemAgendaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/gerar_agendamento';

                RestSrv.add(itemAgendaUrl, $scope.periodoAgendamento, function(status,data) {

                    if(status ==='ok'){
                        //$scope.medicos.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                        showCustomSuccessToast('Sucesso','Horário de Agenda(a) \'' + $scope.itemAgenda.agenda.dataHoraInicialConsulta + '\' gerado(a).');
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

        //var medicoUrl =  '/medico/findByStatus/Ativo';
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';



        /* Find Medico*/
        $scope.data_loading = true;
        RestSrv.find(medicoUrl, function(status,data) {
            $timeout(function(){ // give delay for good UI

                $scope.data_loading = true;
                $scope.medicos = data.data;

                $scope.data_loading = false;

            }, 1000);


        });

        /*Fim Find Medico*/



    });


