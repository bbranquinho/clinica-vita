

"use strict";

angular.module('clinica')

    .controller('NewCompromissoDialogController',function ( $mdDialog, $scope, $mdMedia,FormatDate, $mdToast,RestSrv,SERVICE_PATH,_events, _dialogData,_medico) {
        $scope.calendarEvent = _events;
       // alert($scope.calendarEvent);
        
        $scope.itensAgenda = [];
        $scope.itemAgenda = {};

        $scope.dataInicialConsulta = _events;
        $scope.itemAgenda.medico = _medico;

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



  


        var tipoAgendaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/tipo_agenda';
        var statusAgendaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/status_agenda';
        var dataAgendamentoUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/data_agendamento';


        $scope.getEnuns = function() {



            RestSrv.find(tipoAgendaUrl, function(status,data) {
                $scope.tiposAgenda = data;
                console.log(data);



            });

            RestSrv.find(statusAgendaUrl, function(status,data) {
                $scope.statusAgendas = data;
                console.log(data);



            });

            RestSrv.find(dataAgendamentoUrl, function(status,data) {
                if($scope.itemAgenda.agenda === undefined){
                    var agenda = {agenda:{}};
                    angular.merge($scope.itemAgenda, agenda);
                }

                $scope.itemAgenda.agenda.dataAgendamento = data[0];

                console.log(data);





            });

        }


        $scope.teste = function(fieldData){
            alert(fieldData);
        }

        var horaInicial,horaFinal,minutoInicial,minutoFinal;
        $scope.formattimepiker = function(fieldData,time) {


            if (time < 10 && time != null ){
                time = '0' + String(time);
            }



            if($scope.itemAgenda.agenda === undefined){
                var agenda = {agenda:{}};
                angular.merge($scope.itemAgenda, agenda);
            }


            if(fieldData === 'horaInicial'){horaInicial = time; }
            if(fieldData === 'horaFinal'){horaFinal = time; }
            if(fieldData === 'minutoInicial'){minutoInicial = time; }
            if(fieldData === 'minutoFinal'){minutoFinal = time; }


            console.log($scope.dataFinalConsulta);
            if($scope.dataInicialConsulta != undefined && horaInicial != undefined && minutoInicial != undefined){
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                    $scope.itemAgenda.agenda.dataHoraInicialConsulta = FormatDate.format($scope.dataInicialConsulta)+' ' + horaInicial+':'+ minutoInicial+':'+'00';
            }

            if($scope.dataFinalConsulta != undefined && horaFinal != undefined && minutoFinal != undefined){
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                $scope.itemAgenda.agenda.dataHoraFinalConsulta = FormatDate.format($scope.dataFinalConsulta)+' ' + horaFinal+':'+ minutoFinal+':'+'00';
            }



            /*se a dataInicial for diferente de null, ela será a dataMinima da dataFinal*/
            if($scope.dataInicialConsulta != null && $scope.dataInicialConsulta!= undefined ){
                $scope.dataMinimaInicialFinal = $scope.dataInicialConsulta;

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
        var itemAgendaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda';
        $scope.salvar = function() {

            console.log( $scope.itemAgenda);

            if($scope.itemAgenda === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.add(itemAgendaUrl, $scope.itemAgenda, function(status,data) {

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

        // Data
       /* $scope.dialogData = _dialogData;

        console.log('dialog:');
        console.log($scope.dialogData);

        $scope.dialogData.start = $scope.calendario.startTime;
        console.log();*/
        $scope.notifications = ['15 minutes before', '30 minutes before', '1 hour before'];

        // Methods
        $scope.saveEvent = saveEvent;
        $scope.removeEvent = removeEvent;
        $scope.closeDialog = closeDialog;

       // init();

        //////////


        /*
        * Save the event
        */
        function saveEvent()
        {
            // Convert the javascript date objects back to the moment.js dates
            var dates = {
                start: moment.utc($scope.calendarEvent.start),
                end  : moment.utc($scope.calendarEvent.end)
            };

            var response = {
                type         : $scope.dialogData.type,
                calendarEvent: angular.extend({}, $scope.calendarEvent, dates)
            };

            $mdDialog.hide(response);
        }

        /*
        * Remove the event
        */
        function removeEvent()
        {
            var response = {
                type         : 'remove',
                calendarEvent: $scope.calendarEvent
            };

            $mdDialog.hide(response);
        }

        /*
        * Close the dialog
        */
        function closeDialog()
        {
            $mdDialog.cancel();
        }

    });


