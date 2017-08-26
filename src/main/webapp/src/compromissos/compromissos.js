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


                    /*

                     //"23/11/2009 12:34:00".toDate("dd/mm/yyyy hh:ii");
                     // "2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:");
                     var momentDateTest = moment('04/06/2017 12:34:00', 'DD/MM/YYYY HH:mm:ss');
                     var date = momentDateTest.toDate();

                     //  var date ="04/06/2017 12:34".toDate("dd/mm/yyyy hh:ii");
                     console.log(date);
                     $scope.events[0].start = date;*/
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


                        /*

                         //"23/11/2009 12:34:00".toDate("dd/mm/yyyy hh:ii");
                         // "2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:");
                         var momentDateTest = moment('04/06/2017 12:34:00', 'DD/MM/YYYY HH:mm:ss');
                         var date = momentDateTest.toDate();

                         //  var date ="04/06/2017 12:34".toDate("dd/mm/yyyy hh:ii");
                         console.log(date);
                         $scope.events[0].start = date;*/
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



        /*Formas de converter String para date*/
/*
        //"23/11/2009 12:34:00".toDate("dd/mm/yyyy hh:ii");
        // "2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:");
        //var momentDateTest = moment('23/11/2009 12:34:00', 'DD/MM/YYYY HH:mm:ss');
        //var date = momentDateTest.toDate();


        String.prototype.toDate = function(format)
        {
            var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
            var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
            var formatItems     = normalizedFormat.split('-');
            var dateItems       = normalized.split('-');

            var monthIndex  = formatItems.indexOf("mm");
            var dayIndex    = formatItems.indexOf("dd");
            var yearIndex   = formatItems.indexOf("yyyy");
            var hourIndex     = formatItems.indexOf("hh");
            var minutesIndex  = formatItems.indexOf("ii");
            var secondsIndex  = formatItems.indexOf("ss");

            var today = new Date();

            var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
            var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
            var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

            var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
            var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
            var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

            return new Date(year,month,day,hour,minute,second);
        };*/



/*
        $scope.selectAgenda = function(medico){
            var findMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/item_agenda/findByMedico/" + medico.id;
            //http://localhost:8080/api/private/item_agenda/findByMedico/2
            console.log(findMedicoUrl);

            $scope.medico = medico;

           
            
            RestSrv.find(findMedicoUrl, function(status,data) {


                $scope.agendas = data.data;
                console.log($scope.agendas);


           /!*

                //"23/11/2009 12:34:00".toDate("dd/mm/yyyy hh:ii");
               // "2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:");
                var momentDateTest = moment('04/06/2017 12:34:00', 'DD/MM/YYYY HH:mm:ss');
                var date = momentDateTest.toDate();

              //  var date ="04/06/2017 12:34".toDate("dd/mm/yyyy hh:ii");
                console.log(date);
                $scope.events[0].start = date;*!/
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

        }*/

        $scope.eventClicked = function (item,$event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'src/compromissos/dialog/viewDetailCompromisso.html',
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
           /* var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'src/agenda/dialog/newCompromissoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewCompromissoDialogController',
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


            console.log(date);*/
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

