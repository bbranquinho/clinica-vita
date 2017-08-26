'use strict';

angular.module('clinica')
.directive('cardHome', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'src/gadgets/cardHome/cardHome.html',
        scope: {
            name: '@',
            color: '@',
            icon: "@",
            title: "@",
            titleNumber: "@"
        },controller: function ($scope) {
            $scope.theme = $scope.theme || 'default';

            $scope.value = 0;

            $scope.increment = function() {
                $scope.value++;
                if ($scope.value < parseInt($scope.titleNumber)) {
                    $timeout($scope.increment, 10);
                }
            };
            $scope.increment();





            console.log($scope.value );

           /* $scope.color = 'mat-teal';*/
        }
    }
})


