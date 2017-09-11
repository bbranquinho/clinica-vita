'use strict';

angular.module('clinica')
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'appsrc/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'admin'
        })
        
        .when('/home', {
            templateUrl: 'appsrc/home/home.html',
            controller:'HomeCtrl'
        })

        .when('/pacientes', {
        templateUrl: 'appsrc/paciente/paciente.html',
        controller: 'PacienteCtrl'
         })

        .when('/funcionarios', {
            templateUrl: 'appsrc/funcionario/funcionario.html',
            controller: 'FuncionarioCtrl'
        })


        .when('/medicos', {
            templateUrl: 'appsrc/medico/medico.html',
            controller: 'MedicoCtrl'
        })
        

        .when('/agendas', {
            templateUrl: 'appsrc/agenda/agenda.html',
            controller: 'AgendaCtrl'
        })

        .when('/compromissos', {
            templateUrl: 'appsrc/compromissos/compromissos.html',
            controller: 'AgendaCompromissoCtrl'
        })


        .when('/cargos', {
            templateUrl: 'appsrc/cargo/cargo.html',
            controller: 'CargoCtrl'
        })
        .when('/setores', {
            templateUrl: 'appsrc/setor/setor.html',
            controller: 'SetorCtrl'
        })

        .when('/convenios', {
            templateUrl: 'appsrc/convenio/convenio.html',
            controller: 'ConvenioCtrl'
        })

        .when('/socket', {
            templateUrl: 'appsrc/socket/socket.html',
            controller: 'SocketCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});