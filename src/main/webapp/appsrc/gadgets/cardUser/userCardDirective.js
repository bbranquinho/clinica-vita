'use strict';

angular.module('clinica')
.directive('regularCard', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'appsrc/gadgets/cardUser/regularCard.html',
        scope: {
            name: '@',
            color: '@'
        },
        controller: function ($scope,$rootScope) {
            $scope.authDetails= {};
            $scope.authDetails = $rootScope.authDetails;

          
        }


    }
})
    .directive('userCard', function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'appsrc/gadgets/cardUser/userCard.html',
            scope: {
                name: '@',
                theme: '@',
                color: '@'
            },
            controller: function ($scope) {
                $scope.theme = $scope.theme || 'default';
                //$scope.color = 'mat-teal';
            }
        }
    });

