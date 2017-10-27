
'use strict';
  angular.module('clinica')
      .directive('cardPaciente',function () {

    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardPaciente/cardPaciente.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "=",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@",
        url: "@"
      },
      controller: function($scope,$timeout,SERVICE_PATH,RestSrv) {

          RestSrv.find($scope.url, function (status, data) {
              $scope.title = data;
              console.log($scope.title);


              $scope.value = 0;

              $scope.increment = function() {
                  $scope.value++;
                  if ($scope.value < parseInt($scope.title)) {
                      $timeout($scope.increment, 10);
                  }
              };
              if ($scope.value < parseInt($scope.title)) {
                  $scope.increment();
              }
          });

        }

    };

});


