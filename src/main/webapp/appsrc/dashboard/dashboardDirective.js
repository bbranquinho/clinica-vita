'use strict';

angular.module('clinica')
    .directive('dashboard', function () {
        return {
            restrict: 'E',
            scope: {
                dashboardModel: '=',
                widgetsList: '=',
                dashboardModelTest: '=',
                dashboardModelGrafic: '=',
                onSave: '='
            },
            replace: true,
            templateUrl: 'appsrc/dashboard/dashboardDirective.html',
            controller: 'DashboardDirectiveController',
            controllerAs: 'vm'
        }
    });