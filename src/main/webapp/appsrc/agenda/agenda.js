"use strict";

angular.module('clinica')

    .controller('AgendaCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$document,FormatDate, $mdUtil,$timeout )  {
        $rootScope.statusMenu = true;
        var mdDialog = $mdDialog;

        /*Scroll*/
        $scope.scrollTop = function() {

            var mainContentArea = document.querySelector("[role='main']");
            var scrollContentEl = mainContentArea.querySelector('#content');
            console.log(scrollContentEl);
            console.log('oi');
            $mdUtil.animateScrollTo(scrollContentEl, 0, 200);
        }


        //var medicoUrl =  '/medico/findByStatus/Ativo';
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';

        $scope.medico = {};
        $scope.medicos = [];

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

        $scope.tabIndex = 0;

        $scope.events = [];


        $scope.agendas = {};


        $scope.selectAgenda = function(medico){
            var findMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/item_agenda/findByMedico/" + medico.id;
            //http://localhost:8080/api/private/item_agenda/findByMedico/2
            console.log(findMedicoUrl);

            $scope.medico = medico;



            RestSrv.find(findMedicoUrl, function(status,data) {


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

        }

        $scope.eventClicked = function (item,$event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/agenda/dialog/viewDetailAgenda.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'AgendaDetailDialogController',
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
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/agenda/dialog/newAgendaDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewAgendaDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _events: date,
                    _dialogData:$scope.events,
                    _medico:$scope.medico
                }
            }). then(function(date) { // * Obs fazer de outra forma
                console.log('date:');
                console.log(date);


                var evento_aux = {};
                evento_aux.start = moment(date.agenda.dataHoraInicialConsulta , 'DD/MM/YYYY HH:mm:ss').toDate();
                console.log(evento_aux.start);
                evento_aux.end = moment(date.agenda.dataHoraFinalConsulta , 'DD/MM/YYYY HH:mm:ss').toDate();
                evento_aux.title = date.statusAgenda;
                evento_aux.agenda = date;

                $scope.events.push(evento_aux);
                console.log($scope.events);


                //$scope.events[0].start = date;
                //$scope.events[0].end = date;

                // openToast("Cargo added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


            console.log(date);
        };


        $scope.gerarHorariosAuto = function ($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/agenda/dialog/gerarHorariosAgendaAutoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'GerarHorariosAgendaAutoDialog',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {

                    /*_dialogData:$scope.events,
                    _medico:$scope.medico*/
                }
            }). then(function(date) { // * Obs fazer de outra forma

            }, function () {
                console.log('You cancelled the dialog.');

            });



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

        $rootScope.$on('updateAgenda',function () {
            console.log('on');
            $scope.selectAgenda($scope.medico);
        })

        $rootScope.$on('updateAgendaSol',function (event, opt) {
            console.log('on');
            $scope.selectAgenda(opt.medico);
        })
    });

