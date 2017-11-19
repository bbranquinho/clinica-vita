"use strict";

angular.module('clinica')

    .controller('AgendaCompromissoMedicoCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$document,FormatDate )  {
        $rootScope.statusMenu = true;
        let mdDialog = $mdDialog;

        $scope.medico = {};
        $scope.events = [];


        $scope.agendas = {};



        let userUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';




        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);


            let currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findById/' + $scope.user[0].id;
            RestSrv.find(currentMedicoUrl, function (status, data) {

                $scope.medico = data.data;

                let compromissosMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoMedico/' +  $scope.medico.id;

                RestSrv.find(compromissosMedicoUrl, function (status, data) {

                    console.log(data);


                    $scope.agendas = data.data;
                    console.log($scope.agendas);

                    $scope.events = [];
                    for(let i = 0 ; i < $scope.agendas.length; i++) {
                        let evento_aux = {};
                        evento_aux.start = moment($scope.agendas[i].agenda.dataHoraInicialConsulta , 'DD/MM/YYYY HH:mm:ss').toDate();
                        console.log(evento_aux.start);
                        evento_aux.end = moment($scope.agendas[i].agenda.dataHoraFinalConsulta , 'DD/MM/YYYY HH:mm:ss').toDate();
                        evento_aux.title = $scope.agendas[i].statusAgenda;
                        evento_aux.agenda = $scope.agendas[i];

                        $scope.events.push(evento_aux);


                    }

                    console.log($scope.events);

                    // openToast('Loaded Medicos with success.', 'success');

                });

            });

        });



        $scope.updateAgendaCompromisso = function() {


            let userUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';


            RestSrv.find(userUrl, function (status, data) {
                $scope.user = data;
                console.log($scope.user);


                let currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findById/' + $scope.user[0].id;
                RestSrv.find(currentMedicoUrl, function (status, data) {

                    $scope.medico = data.data;

                    let compromissosMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoMedico/' + $scope.medico.id;

                    RestSrv.find(compromissosMedicoUrl, function (status, data) {

                        console.log(data);


                        $scope.agendas = data.data;
                        console.log($scope.agendas);


                        $scope.events = [];
                        for (let i = 0; i < $scope.agendas.length; i++) {
                            let evento_aux = {};
                            evento_aux.start = moment($scope.agendas[i].agenda.dataHoraInicialConsulta, 'DD/MM/YYYY HH:mm:ss').toDate();
                            console.log(evento_aux.start);
                            evento_aux.end = moment($scope.agendas[i].agenda.dataHoraFinalConsulta, 'DD/MM/YYYY HH:mm:ss').toDate();
                            evento_aux.title = $scope.agendas[i].statusAgenda;
                            evento_aux.agenda = $scope.agendas[i];

                            $scope.events.push(evento_aux);


                        }

                        console.log($scope.events);


                        // openToast('Loaded Medicos with success.', 'success');


                    });

                });

            });
        }

        //let medicoUrl =  '/medico/findByStatus/Ativo';
        let medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';
        
        $scope.medico = {};
        $scope.medicos = [];

        RestSrv.find(medicoUrl, function(status,data) {

                $scope.medicos = data.data;

           // openToast('Loaded Medicos with success.', 'success');


        });

        $scope.tabIndex = 0;


        $scope.eventClicked = function (item,$event) {
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/compromissos/dialog/viewDetailCompromisso.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'CompromissoDetailDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _events: item
                }
            }). then(function(item) { // * Obs fazer de outra forma



                // openToast("Cargo added");
            }, function () {
                console.log('You cancelled the dialog.');

            });



            console.log(item);
        };

        $scope.createClicked = function ($event,date) {
            return;

        };

        function getDate(offsetDays, hour) {
            offsetDays = offsetDays || 0;
            let offset = offsetDays * 24 * 60 * 60 * 1000;
            let date = new Date(new Date().getTime() + offset);
            if (hour) { date.setHours(hour); }
            return date;
        }

        function formattedDate(fieldData) {
            return FormatDate.format(fieldData);

        };


        $scope.dis = false;
        
        
        /*Atualiza a agenda*/

        $rootScope.$on('updateAgendaCompromisso',function () {
            console.log('on');
            $scope.updateAgendaCompromisso();
        })
    });

