
  angular.module('clinica').directive('cardLineGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'src/gadgets/cardLineGrafic/cardLineGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@"
      },
      controller: function  ($scope, $timeout) {




          $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
          $scope.series = ['Series A', 'Series B'];
          $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };

          // Simulate async data update
          $timeout(function () {
            $scope.data = [
              [28, 48, 40, 19, 86, 27, 90],
              [65, 59, 80, 81, 56, 55, 40]
            ];
          }, 3000);


        /*var chart = this;

        chart.options = {
          chart: {
            type: 'lineChart',
            height: 250,
            margin: {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
            },
            x: function (d) {
              return d.x;
            },
            y: function (d) {
              return d.y;
            },
            useInteractiveGuideline: true,
            xAxis: {
              axisLabel: 'Dia',
              tickFormat: function (d) {
                return String(d + 1);
                //return String(d + 1) + '.10.2016';
              }
            },
            yAxis: {
              axisLabel: 'Agendamentos',
              axisLabelDistance: -10
            },
            showLegend: false
          }
        };

        var values = [
          {x:0,y:7},
          {x:1,y:10},
          {x:2,y:6},
          {x:3,y:6},
          {x:4,y:8},
          {x:5,y:1},
          {x:6,y:9},
          {x:8,y:7}

        ]

/!*
        var values = _.map(_.range(31), function (val) {
          return {
            x: val,
            y: _.random(6, 10)
          }
        });*!/

        chart.data = [{
          key: 'Agendamentos Realizados:',
          values: values,
          color: '#2196F3'
        }];*/
      },
      controllerAs: 'chart'
    };

});