"use strict";

angular.module('clinica')
    .controller('AgendamentoController', function ($scope,$mdToast,$mdDialog,RestSrv,SERVICE_PATH, FormatDate,FormatBDate, $mdMedia,$rootScope) {
        let mdDialog = $mdDialog;

        $scope.dataDisponivelFinal = true;


        /*dialog Show convenios*/

        $scope.showConvenio = function(medico,$event) {
            console.log('showConvenio');
            // Appending dialog to document.body to cover sidenav in docs app
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'appsrc/agenda/agendamento/dialogConvenio/dialogConvenio.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: DialogConvenioController,
                    controllerAs: 'ctrl',
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,

                    locals: {
                        _medico: medico

                    }

                }


            ).then(function() {



            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });

            function DialogConvenioController($scope, $mdDialog, _medico) {
                $scope.medico = _medico;

                let findConvenioMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/convenio/findByMedico/" + $scope.medico.id;

                RestSrv.find(findConvenioMedicoUrl, function(status,data) {


                    $scope.conveniosMedico = data.data;
                    console.log(data);


                });

                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };




        /* Fim show/hide convenios*/



        Date.prototype.addDias = function(dias){
            this.setDate(this.getDate() + dias)
        };




        /*Data Minima e Maxima para Agendamento*/
        let dias = 7;
        $scope.dataMinina  = new Date();
        $scope.dataMinina.addDias(1);
        $scope.dataMaxima = new Date();
        $scope.dataMaxima.addDias(dias);
        /*--Fim Data Minima e Maxima para Agendamento*/

        $scope.initParamenters = {showPesquisa: true , showCardTable: true , showResultHorarios:false};
        $scope.medico = {};
        $scope.setMedico = function(elements){
            if(elements != null) {
                $scope.medico = elements;
            }

        }


        $scope.itemAgenda = {};
        $scope.itensAgenda = [];


        $scope.searchHorarios = function(){
            console.log($scope.elements.medico.id);
            console.log($scope.elements.datasDiponiveis);


            let dataSearchInicial = FormatBDate.format($scope.elements.datasDiponiveis);
            let dataSearchFinal = FormatBDate.format($scope.elements.dataDisponivelFinal);

            //var isafter = moment(dataSearchInicial).isAfter(dataSearchFinal);

           let itemAgendaUrl = SERVICE_PATH.PRIVATE_PATH +'/item_agenda/find_horario_agendamento/'+ dataSearchInicial + '/'+ dataSearchFinal + '/' + $scope.elements.medico.id ;
            //http://localhost:8080/api/private/item_agenda/find_horario_agendamento/15-06-2017/3



            RestSrv.find(itemAgendaUrl, function(status,data) {


                $scope.itensAgenda = data;
                $scope.initParamenters.showResultHorarios = true;


            });
        }




        let horaInicial,horaFinal,minutoInicial,minutoFinal;
        $scope.formattimepiker = function(fieldData,time) {


            if (time < 10 && time != null ){
                time = '0' + String(time);
            }



            if($scope.itemAgenda.agenda === undefined){
                let agenda = {agenda:{}};
                angular.merge($scope.itemAgenda, agenda);
            }


            if(fieldData === 'horaInicial'){horaInicial = time; }
            if(fieldData === 'horaFinal'){horaFinal = time; }
            if(fieldData === 'minutoInicial'){minutoInicial = time; }
            if(fieldData === 'minutoFinal'){minutoFinal = time; }


            console.log(this.dataInicialConsulta);

            if(this.dataInicialConsulta != undefined && horaInicial != undefined && minutoInicial != undefined){
                    if($scope.elements.medico != undefined && $scope.elements.medico != null){
                        $scope.itemAgenda.medico = $scope.elements.medico;
                    }
                //$scope.itemAgenda.agenda.dataHoraInicialConsulta = 'qwerqer';
                $scope.itemAgenda.agenda.dataHoraInicialConsulta = FormatDate.format(this.dataInicialConsulta)+' ' + horaInicial+':'+ minutoInicial+':'+'00';
            }



            console.log(time);


        };




        $scope.persquisarHorarios = function(){
            if($scope.elements.medico != undefined && $scope.elements.medico != null){
                $scope.itemAgenda.medico = $scope.elements.medico;
            }

            
        }

        $scope.medicos = [];
        let medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo' ;

        console.log(medicoUrl);

        RestSrv.find(medicoUrl, function(status,data) {


            $scope.medicos = data.data;



        });



        $scope.novoAgendamento = function ($event,itemAgenda) {
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/agenda/agendamento/newAgendamentoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewAgendamentoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _itensAgenda: itemAgenda

                }
            }). then(function(itemAgenda) { // * Obs fazer de outra forma
                console.log('date:');
                console.log(itemAgenda);

                $scope.persquisarHorarios();

                /*Dispara um evento para atualizar a agenda*/
               // $scope.$broadcast("updateAgenda");

                console.log(itemAgenda.medico.id);
                $rootScope.$broadcast('updateAgendaSol', {medico: itemAgenda.medico});



            }, function () {
                console.log('You cancelled the dialog.');

            });


            console.log(itemAgenda);
        };



        $scope.changeStatusDataFinal = function() {
            $scope.dataDisponivelFinal = false;

            $scope.dataMinimaInicialFinal = $scope.elements.datasDiponiveis;
            $scope.dataMaximaInicial = $scope.dataMaxima;

        }

    });