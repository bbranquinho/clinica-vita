
  angular.module('clinica').directive('cardDonutGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'src/gadgets/cardDonutGrafic/cardDonutGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@"
      },
      controller: function ($scope, $timeout) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];


       /* chart.options = {
          chart: {
            type: 'pieChart',
            height: 252,
            donut: true,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,

            pie: {
              startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
              endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },
            duration: 500,
            legend: {
              margin: {
                top: 5,
                right: 70,
                bottom: 5,
                left: 0
              }
            }
          }
        };

        chart.data = [
          {
            key: "One",
            y: 5
          },
          {
            key: "Two",
            y: 2
          },
          {
            key: "Three",
            y: 9
          },
          {
            key: "Four",
            y: 7
          },
          {
            key: "Five",
            y: 4
          },
          {
            key: "Six",
            y: 3
          },
          {
            key: "Seven",
            y: .5
          }
        ];*/

      },
      controllerAs: 'chart'
    };

});