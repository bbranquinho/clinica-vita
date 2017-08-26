'use strict';

angular.module('clinica')
.directive('regularCard', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'src/gadgets/cardUser/regularCard.html',
        scope: {
            name: '@',
            color: '@'
        },
        controller: function ($scope,$rootScope) {
            $scope.authDetails= {};
            $scope.authDetails = $rootScope.authDetails;

           /* $scope.hasAnyPermission = function(authorities) {
                var hasPermission = false;

                $rootScope.authDetails.permissions.forEach(function(permission) {
                    authorities.forEach(function(authority) {
                        if (permission.authority === authority) {
                            hasPermission = true;
                        }
                    });
                });



                return hasPermission;
            };*/
        }


    }
})
    .directive('userCard', function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'src/gadgets/cardUser/userCard.html',
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

