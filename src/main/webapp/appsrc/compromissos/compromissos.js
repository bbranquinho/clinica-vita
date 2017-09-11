"use strict";

angular.module('clinica')

    .controller('AgendaCompromissoCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$document,FormatDate )  {
        $rootScope.statusMenu = true;
        var mdDialog = $mdDialog;

        $scope.paciente = {};
        $scope.events = [];


        $scope.agendas = {};



        var userUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';




        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);


            var currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findById/' + $scope.user[0].id;
            RestSrv.find(currentPacienteUrl, function (status, data) {

                $scope.paciente = data.data;

                var compromissosPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoPaciente/' +  $scope.paciente.id;

                RestSrv.find(compromissosPacienteUrl, function (status, data) {

                    console.log(data);


                    $scope.agendas = data.data;
                    console.log($scope.agendas);

                    $scope.events = [];
                    for(var i = 0 ; i < $scope.agendas.length; i++) {
                        var evento_aux = {};
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


            var userUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';


            RestSrv.find(userUrl, function (status, data) {
                $scope.user = data;
                console.log($scope.user);


                var currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findById/' + $scope.user[0].id;
                RestSrv.find(currentPacienteUrl, function (status, data) {

                    $scope.paciente = data.data;

                    var compromissosPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoPaciente/' + $scope.paciente.id;

                    RestSrv.find(compromissosPacienteUrl, function (status, data) {

                        console.log(data);


                        $scope.agendas = data.data;
                        console.log($scope.agendas);


                        $scope.events = [];
                        for (var i = 0; i < $scope.agendas.length; i++) {
                            var evento_aux = {};
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

        //var medicoUrl =  '/medico/findByStatus/Ativo';
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';
        
        $scope.medico = {};
        $scope.medicos = [];

        RestSrv.find(medicoUrl, function(status,data) {

                $scope.medicos = data.data;

           // openToast('Loaded Medicos with success.', 'success');


        });

        $scope.tabIndex = 0;


        $scope.eventClicked = function (item,$event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


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
            var offset = offsetDays * 24 * 60 * 60 * 1000;
            var date = new Date(new Date().getTime() + offset);
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

