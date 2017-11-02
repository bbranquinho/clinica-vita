'use strict';

angular.module('clinica')
    .controller('HomeCtrl', function ($mdDialog,  $mdMedia, $mdToast,$scope, UserService,SERVICE_PATH,RestSrv, $rootScope,$timeout,$interval,$mdUtil) {
        $rootScope.statusMenu = true;
        $scope.msg = 'Content-Home';

        /*view scrow button*/
        $scope.scrollTop = function() {

            var mainContentArea = document.querySelector("[role='main']");
            var scrollContentEl = mainContentArea.querySelector('#content');
            console.log(scrollContentEl);
            console.log('oi');
            $mdUtil.animateScrollTo(scrollContentEl, 0, 200);
        }

       


        $scope.hasAnyPermission = function(authorities) {
            var hasPermission = false;

            $rootScope.authDetails.permissions.forEach(function(permission) {
                authorities.forEach(function(authority) {
                    if (permission.authority === authority) {
                        hasPermission = true;
                    }
                });
            });



            return hasPermission;
        };

        $scope.user = {};
        $scope.medico = [];
        $scope.funcionario = [];
        $scope.paciente = [];
        $scope.admin = [];


        var mdDialog = $mdDialog;


        this.cancel = $mdDialog.cancel;


        let userUrl = SERVICE_PATH.PRIVATE_PATH + '/usuario/findCurrentUser';
        let currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';
        let currentFuncionarioUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/findCurrentUser';
        let currentPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/findCurrentUser';
        let medicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico';
        let pacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente';
        let funcionarioUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario';
        let quantidadePacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/quantidade_pacientes';
        let quantidadeMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/quantidade_medicos';
        let quantidadeAgendamentos = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/quantidade_agendamentos';
        let quantidadePacientesSexoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/quantidade_pacientes_sexo/';
        let quantidadeAgendamentosSexoMes = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/quantidade_agendamentos_sexo_mes';
        let quantidadeAgendamentosSexoAno = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/quantidade_agendamentos_sexo_ano';
        let quantidadeConsultasRealizadasMes = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/quantidade_consultas_realizadas_mes';
        let quantidadeSolicitacoesAgendamento = SERVICE_PATH.PRIVATE_PATH + '/item_agenda/quantidade_solicitacoes_agendamento';



        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);

            if($scope.user != null && $scope.user != undefined){

                if($scope.user[0].permissoes[0].role === "ROLE_MEDICO"){
                    RestSrv.find(currentMedicoUrl, function (status, data) {
                        $scope.medico = data;


                        console.log($scope.medico);

                    });

                }else if($scope.user[0].permissoes[0].role === "ROLE_FUNCIONARIO" ||$scope.user[0].permissoes[0].role === "ROLE_ADMIN" || $scope.user[0].permissoes[0].role === "ROLE_SECRETARIA"){
                    RestSrv.find(currentFuncionarioUrl, function (status, data) {
                        $scope.funcionario = data;
                        console.log($scope.funcionario);





                    });

                }else if($scope.user[0].permissoes[0].role === "ROLE_PACIENTE"){
                    RestSrv.find(currentPacienteUrl, function (status, data) {
                        $scope.paciente = data;


                        console.log($scope.paciente);

                    });

                }


            }


        });


        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };


        $scope.editMedico = function($event,editarmedico_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarmedico_aux);
            if(editarmedico_aux != null){
                $scope.medico = editarmedico_aux;
            }



            mdDialog.show({
                templateUrl: 'appsrc/medico/dialog/editMedicoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditMedicoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarMedico: $scope.medico,
                    _editarmedico_aux: editarmedico_aux,
                    _editMedico: $scope.medico[0]
                }

            }). then(function(medico) { // * Obs fazer de outra forma
                $scope.medico[0] = medico;
                $rootScope.$broadcast('updateCurrentUserPerfil', medico);

                $scope.selected = [];
                // openToast("Medico added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };




        $scope.editPaciente = function($event,editarpaciente_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarpaciente_aux);
            if(editarpaciente_aux != null){
                $scope.paciente = editarpaciente_aux;
            }



            mdDialog.show({
                templateUrl: 'appsrc/paciente/dialog/editPacienteDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditPacienteDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarPaciente: $scope.paciente,
                    _editarpaciente_aux: editarpaciente_aux,
                    _editPaciente: $scope.paciente[0]
                }

            }). then(function(paciente) { // * Obs fazer de outra forma
                $scope.paciente[0] = paciente;
                $rootScope.$broadcast('updateCurrentUserPerfil', paciente);

                $scope.selected = [];
                // openToast("Paciente added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        $scope.editFuncionario = function($event,editarfuncionario_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarfuncionario_aux);
            if(editarfuncionario_aux != null){
                $scope.funcionario = editarfuncionario_aux;
            }



            mdDialog.show({
                templateUrl: 'appsrc/funcionario/dialog/editFuncionarioDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditFuncionarioDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarFuncionario: $scope.funcionario,
                    _editarfuncionario_aux: editarfuncionario_aux,
                    _editFuncionario: $scope.funcionario[0]
                }

            }). then(function(funcionario) { // * Obs fazer de outra forma
                $scope.funcionario[0] = funcionario;

                $rootScope.$broadcast('updateCurrentUserPerfil', funcionario);


                $scope.selected = [];
                // openToast("Funcionario added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        $scope.tabIndex = 0;

       $scope.determinateValue = 0;
        $timeout(function(){ // give delay for good UI
            while( $scope.determinateValue < 100){
                $scope.determinateValue++;
            }



        }, 1000);







            $scope.modelTeste = {
                'rows': [{
                    'columns': [{
                        'layoutPadding':'',
                        'layout': 'row',
                        'flex': '',
                        'gadgets': [{
                            'directiveName': 'regular-card',
                            'template':'<regular-card color="mat-indigo"></regular-card>',
                            'title': 'Open Issues',
                            'color': 'mat-indigo',
                            'type': 'tile',
                            'icon': 'picture_in_picture'
                        }]
                    }]


                },{

                    'layout': 'row',

                    'columns': [{

                        'gadgets': [{
                            'directiveName': 'card-home',
                            'template': '<card-home color="mat-teal" url="'+ quantidadeAgendamentos +'" icon="notifications" ng-show="hasAnyPermission([\'ROLE_ADMIN\'])"title-number="35"title="Notificações"></card-home>',
                            'title': 'Open Issues',
                            'color': 'mat-teal',
                            'type': 'tile',
                            'icon': 'picture_in_picture'
                        }]

                    },{

                        'gadgets': [{
                            'directiveName': 'card-home',
                            'template': '<card-home color="mat-gray" icon="event" ng-show="hasAnyPermission([\'ROLE_ADMIN\'])" title-number="20" url="'+ quantidadeAgendamentos +'" title="Agendamentos"></card-home>',
                            'title': 'Open Issues',
                            'color': 'mat-gray',
                            'type': 'tile',
                            'icon': 'picture_in_picture'
                        }]

                    }]


                },{

                    'layout': 'row',

                    'columns': [{

                        'gadgets': [{
                            'template': '<card-paciente color="mat-blue" ng-if="hasAnyPermission([\'ROLE_ADMIN\']);" icon="medico_home" title="Medicos" color-title="primary " url="'+ quantidadeMedicoUrl +'" body-a="Médicos" body-b="Cadastrados"></card-paciente>'

                        }]

                    },{

                        'gadgets': [{
                            'template': '<card-paciente color="mat-green" ng-show="hasAnyPermission([\'ROLE_ADMIN\'])" icon="paciente_home" title="Pacientes" color-title="primary " url="'+ quantidadePacienteUrl +'" body-a="Pacientes" body-b="Cadastrados"></card-paciente>',

                        }]

                    }]


                }]
            };






        $scope.modelGrafic = {
            'rows': [{

                'layout': 'row',

                'columns': [{

                    'gadgets': [{
                        'template': '<card-donut-grafic color="mat-clean-yellow" icon="event" title="Pacientes(Por: sexo)" color-title="primary " url="'+ quantidadePacientesSexoUrl +'" params-url="[\'Masculino\',\'Feminino\']"   body-a="Pacientes" body-b="Cadastrados" ng-if="hasAnyPermission([\'ROLE_ADMIN\']);"></card-donut-grafic>'

                    }]

                },{
                    'gadgets': [{
                        'template': '<card-bar-grafic color="mat-clean-green" icon="event" title="Agendamentos:Mês(Azul:F/Cinza:M)" url="'+ quantidadeAgendamentosSexoMes +'" params-x="[\'JAN\',\'FEV\',\'MAR\',\'ABR\',\'MAI\',\'JUN\',\'JUL\',\'AGO\',\'SET\',\'OUT\',\'NOV\',\'DEZ\']" color-title="primary " body-a="Médicos" ng-if="hasAnyPermission([\'ROLE_ADMIN\']);" body-b="Cadastrados"></card-bar-grafic>'

                    }]

                }]


            },{

                'layout': 'row',

                'columns': [{

                    'gadgets': [{

                        'template': '<card-polar-grafic color="mat-tomato" icon="event" title="80" color-title="primary " body-a="Pacientes" body-b="Cadastrados"></card-polar-grafic>'

                    }]

                },{

                    'gadgets': [{

                        'template': '<card-bar-horizontal-grafic color="mat-blue_dark_clean" icon="event" title="Agendamentos:Ano(Azul:F/Cinza:M)" url="'+ quantidadeAgendamentosSexoAno +'" color-title="primary " body-a="Médicos" body-b="Cadastrados"></card-bar-horizontal-grafic>'

                    }]

                }]


            },{

                'layout': 'row',

                'columns': [{

                    'gadgets': [{
                        'template': '<card-pie-grafic color="mat-green_light" icon="event" url="'+ quantidadeSolicitacoesAgendamento +'" params="[\'Aguardando Autorização\',\'Não Agendado\',\'Cancelado\',\'Faltou\']" title="50" color-title="primary " body-a="Médicos" body-b="Cadastrados"></card-pie-grafic>'
                    }]

                },{

                    'gadgets': [{
                        'template': '<card-line-grafic color="mat-concrete" icon="event" title="Consutas Realizadas:Mês" params-x="[\'JAN\',\'FEV\',\'MAR\',\'ABR\',\'MAI\',\'JUN\',\'JUL\',\'AGO\',\'SET\',\'OUT\',\'NOV\',\'DEZ\']" url="'+ quantidadeConsultasRealizadasMes +'" title="50" color-title="primary " body-a="Médicos" body-b="Cadastrados"></card-line-grafic>'

                    }]

                }]


            }]
        };
        
        $scope.allWidgets = [{
            directiveName: 'pie-chart',
            title: 'Current Issues Chart',
            'type': 'chart',
            'icon': 'pie_chart'
        }, {
            directiveName: 'line-chart',
            title: 'Issues in Last Month',
            'type': 'chart',
            'icon': 'show_chart'
        }, {
            directiveName: 'open-tile',
            title: 'Open Issues',
            'type': 'tile',
            'icon': 'picture_in_picture'
        }, {
            directiveName: 'closed-tile',
            title: 'Closed Issues',
            'type': 'tile',
            'icon': 'picture_in_picture'
        }, {
            directiveName: 'in-progress-tile',
            title: 'Issues in Progress',
            'type': 'tile',
            'icon': 'picture_in_picture'
        }, {
            directiveName: 'backlog-tile',
            title: 'Backlog Issues',
            'type': 'tile',
            'icon': 'picture_in_picture'
        }];


    })