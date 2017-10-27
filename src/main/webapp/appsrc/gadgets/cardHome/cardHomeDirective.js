'use strict';

angular.module('clinica')
.directive('cardHome', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'appsrc/gadgets/cardHome/cardHome.html',
        scope: {
            name: '@',
            color: '@',
            icon: "@",
            title: "@",
            titleNumber: "@",
            url: "@"
        },controller: function ($scope,SERVICE_PATH,RestSrv) {
            $scope.theme = $scope.theme || 'default';


            RestSrv.find($scope.url, function (status, data) {
                $scope.titleNumber = data;
                console.log($scope.titleNumber);


                $scope.value = 0;

                $scope.increment = function() {
                    $scope.value++;
                    if ($scope.value < parseInt($scope.titleNumber)) {
                        $timeout($scope.increment, 10);
                    }
                };
                if ($scope.value < parseInt($scope.titleNumber)) {
                    $scope.increment();
                }
            });


           /* $scope.color = 'mat-teal';*/
        }
    }
})


