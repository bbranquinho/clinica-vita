"use strict";

angular.module('clinica')

    .controller('AgendaCompromissoCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$document,FormatDate )  {
        $rootScope.statusMenu = true;
        let mdDialog = $mdDialog;

        $scope.paciente = {};
        $scope.events = [];
        $scope.medico = {};
        $scope.currentPermission = {};

        $scope.agendas = {};


        let userUrl = SERVICE_PATH.PRIVATE_PATH + '/usuario/findCurrentUser';


        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);

            $scope.currentPermission = $scope.user[0].permissoes[0].role;

            if($scope.user != null && $scope.user != undefined){
                if($scope.user[0].permissoes[0].role === "ROLE_MEDICO"){

                    let userMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';




                    RestSrv.find(userMedicoUrl, function (status, data) {
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



                }else if($scope.user[0].permissoes[0].role === "ROLE_PACIENTE"){


                    let userMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';




                    RestSrv.find(userMedicoUrl, function (status, data) {
                        $scope.user = data;
                        console.log($scope.user);

                        let currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findById/' + $scope.user[0].id;
                        RestSrv.find(currentPacienteUrl, function (status, data) {

                            $scope.paciente = data.data;

                            let compromissosPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoPaciente/' +  $scope.paciente.id;

                            RestSrv.find(compromissosPacienteUrl, function (status, data) {

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

                            });

                        });
                    });
                }
            }
        });




        $scope.updateAgendaCompromisso = function() {


            let userPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';


            RestSrv.find(userPacienteUrl, function (status, data) {
                $scope.user = data;
                console.log($scope.user);


                let currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findById/' + $scope.user[0].id;
                RestSrv.find(currentPacienteUrl, function (status, data) {

                    $scope.paciente = data.data;

                    let compromissosPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/findCompromissoPaciente/' + $scope.paciente.id;

                    RestSrv.find(compromissosPacienteUrl, function (status, data) {

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


        /*Atualiza a agenda*/

        $rootScope.$on('updateAgendaCompromisso',function () {
            console.log('on');
            $scope.updateAgendaCompromisso();
        })
    });

