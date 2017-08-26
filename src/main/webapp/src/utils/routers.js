'use strict';

angular.module('clinica')
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'admin'
        })
        
        .when('/home', {
            templateUrl: 'src/home/home.html',
            controller:'HomeCtrl'
        })

        .when('/pacientes', {
        templateUrl: 'src/paciente/paciente.html',
        controller: 'PacienteCtrl'
         })

        .when('/funcionarios', {
            templateUrl: 'src/funcionario/funcionario.html',
            controller: 'FuncionarioCtrl'
        })


        .when('/medicos', {
            templateUrl: 'src/medico/medico.html',
            controller: 'MedicoCtrl'
        })
        

        .when('/agendas', {
            templateUrl: 'src/agenda/agenda.html',
            controller: 'AgendaCtrl'
        })

        .when('/compromissos', {
            templateUrl: 'src/compromissos/compromissos.html',
            controller: 'AgendaCompromissoCtrl'
        })


        .when('/cargos', {
            templateUrl: 'src/cargo/cargo.html',
            controller: 'CargoCtrl'
        })
        .when('/setores', {
            templateUrl: 'src/setor/setor.html',
            controller: 'SetorCtrl'
        })

        .when('/convenios', {
            templateUrl: 'src/convenio/convenio.html',
            controller: 'ConvenioCtrl'
        })

        .when('/socket', {
            templateUrl: 'src/socket/socket.html',
            controller: 'SocketCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});