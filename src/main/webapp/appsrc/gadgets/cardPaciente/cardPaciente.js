
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
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@"
      },
      controller: function($scope,$timeout) {

          $scope.value = 0;

          $scope.increment = function() {
            $scope.value++;
            if ($scope.value < parseInt($scope.title)) {
              $timeout($scope.increment, 10);
            }
          };
          $scope.increment();
        }

    };

});


