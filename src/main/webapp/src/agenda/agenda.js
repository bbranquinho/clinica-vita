"use strict";

angular.module('clinica')

    .controller('AgendaCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$document,FormatDate, $mdUtil )  {
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
        
      /*  var vm = this;

        // Data
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.events = [
            [
                {
                    id   : 1,
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    end  : null
                },
                {
                    id   : 2,
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end  : new Date(y, m, d - 2)
                },
                {
                    id   : 3,
                    title: 'Some Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    end  : null
                },
                {
                    id   : 4,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    end  : null
                },
                {
                    id   : 5,
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end  : new Date(y, m, d + 1, 22, 30)
                },
                {
                    id   : 6,
                    title: 'All Day Event',
                    start: new Date(y, m, d + 8, 16, 0),
                    end  : null
                },
                {
                    id   : 7,
                    title: 'Long Event',
                    start: new Date(y, m, d + 12, 16, 0),
                    end  : null
                },
                {
                    id   : 8,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 2, 0),
                    end  : null
                },
                {
                    id   : 9,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 4, 0),
                    end  : null
                },
                {
                    id   : 10,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 2, 0),
                    end  : null
                },
                {
                    id   : 11,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 4, 0),
                    end  : null
                },
                {
                    id   : 12,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 2, 0),
                    end  : null
                },
                {
                    id   : 13,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 14, 4, 0),
                    end  : null
                },
                {
                    id   : 14,
                    title: 'Conference',
                    start: new Date(y, m, d + 17, 4, 0),
                    end  : null
                },
                {
                    id   : 15,
                    title: 'Meeting',
                    start: new Date(y, m, d + 22, 4, 0),
                    end  : new Date(y, m, d + 24, 4, 0)
                }
            ]
        ];

        vm.calendarUiConfig = {
            calendar: {
                editable          : true,
                eventLimit        : true,
                header            : '',
                handleWindowResize: false,
                aspectRatio       : 1,
                dayNames          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort     : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                viewRender        : function (view)
                {
                    vm.calendarView = view;
                    vm.calendar = vm.calendarView.calendar;
                    vm.currentMonthShort = vm.calendar.getDate().format('MMM');
                },
                columnFormat      : {
                    month: 'ddd',
                    week : 'ddd D',
                    day  : 'ddd M'
                },
                eventClick        : eventDetail,
                selectable        : true,
                selectHelper      : true,
                select            : select
            }
        };

        // Methods
        vm.addEvent = addEvent;
        vm.next = next;
        vm.prev = prev;

        //////////

        /!**
         * Go to next on current view (week, month etc.)
         *!/
        function next()
        {
            vm.calendarView.calendar.next();
        }

        /!**
         * Go to previous on current view (week, month etc.)
         *!/
        function prev()
        {
            vm.calendarView.calendar.prev();
        }

        /!**
         * Show event detail
         *
         * @param calendarEvent
         * @param e
         *!/
        function eventDetail(calendarEvent, e)
        {
            showEventDetailDialog(calendarEvent, e);
        }

        /!**
         * Add new event in between selected dates
         *
         * @param start
         * @param end
         * @param e
         *!/
        function select(start, end, e)
        {
            showEventFormDialog('add', false, start, end, e);
        }

        /!**
         * Add event
         *
         * @param e
         *!/
        function addEvent(e)
        {
            var start = new Date(),
                end = new Date();

            showEventFormDialog('add', false, start, end, e);
        }

        /!**
         * Show event detail dialog
         * @param calendarEvent
         * @param e
         *!/
        function showEventDetailDialog(calendarEvent, e)
        {
            $mdDialog.show({
                controller         : 'EventDetailDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/calendar/dialogs/event-detail/event-detail-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    calendarEvent      : calendarEvent,
                    showEventFormDialog: showEventFormDialog,
                    event              : e
                }
            });
        }

        /!**
         * Show event add/edit form dialog
         *
         * @param type
         * @param calendarEvent
         * @param start
         * @param end
         * @param e
         *!/
        function showEventFormDialog(type, calendarEvent, start, end, e)
        {
            var dialogData = {
                type         : type,
                calendarEvent: calendarEvent,
                start        : start,
                end          : end
            };

            $mdDialog.show({
                controller         : 'EventFormDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/calendar/dialogs/event-form/event-form-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: dialogData
                }
            }).then(function (response)
            {
                switch ( response.type )
                {
                    case 'add':
                        // Add new
                        $scope.events[0].push({
                            id   : $scope.events[0].length + 20,
                            title: response.calendarEvent.title,
                            start: response.calendarEvent.start,
                            end  : response.calendarEvent.end
                        });
                        break;

                    case 'edit':
                        // Edit
                        for ( var i = 0; i < $scope.events[0].length; i++ )
                        {
                            // Update
                            if ( $scope.events[0][i].id === response.calendarEvent.id )
                            {
                                $scope.events[0][i] = {
                                    title: response.calendarEvent.title,
                                    start: response.calendarEvent.start,
                                    end  : response.calendarEvent.end
                                };

                                break;
                            }
                        }
                        break;

                    case 'remove':
                        // Remove
                        for ( var j = 0; j < $scope.events[0].length; j++ )
                        {
                            // Update
                            if ( $scope.events[0][j].id === response.calendarEvent.id )
                            {
                                $scope.events[0].splice(j, 1);

                                break;
                            }
                        }
                        break;
                }
            });
        }




*/




        //var medicoUrl =  '/medico/findByStatus/Ativo';
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH +'/medico/findByStatus/Ativo';
        
        $scope.medico = {};
        $scope.medicos = [];

        RestSrv.find(medicoUrl, function(status,data) {


                $scope.medicos = data.data;





           // openToast('Loaded Medicos with success.', 'success');


        });

        $scope.tabIndex = 0;

        $scope.events = [];


        $scope.agendas = {};


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




        $scope.selectAgenda = function(medico){
            var findMedicoUrl = SERVICE_PATH.PRIVATE_PATH + "/item_agenda/findByMedico/" + medico.id;
            //http://localhost:8080/api/private/item_agenda/findByMedico/2
            console.log(findMedicoUrl);

            $scope.medico = medico;

           
            
            RestSrv.find(findMedicoUrl, function(status,data) {


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

        }

        $scope.eventClicked = function (item,$event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'src/agenda/dialog/viewDetailAgenda.html',
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
                templateUrl: 'src/agenda/dialog/newAgendaDialog.html',
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
    });

