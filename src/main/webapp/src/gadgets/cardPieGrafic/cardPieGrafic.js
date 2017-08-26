
  angular.module('clinica').directive('cardPieGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'src/gadgets/cardPieGrafic/cardPieGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@"
      },
      controller: function ($scope) {

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
        
        
        
        
        
       /* var chart = this;

        chart.options = {
          'chart': {
            'type': 'pieChart',
            'height': 300,
            x: function (d) {
              return d.key;
            },
            y: function (d) {
              return d.y;
            },
            color: ['#62BAB3','#ED6D58'],
            'showLabels': false,
            'duration': 500,
            'labelThreshold': 0.01,
            'labelSunbeamLayout': true,
            'legend': {
              'margin': {
                'top': 10,
                'right': 10,
                'bottom': 10,
                'left': 10
              }
            }
          }
        };

/!*        var allIssues = _.random(10, 50);
        var opened = Math.floor(_.random(10, 90) * allIssues / 100);*!/
        var allIssues = 50;
        var homens = Math.floor(40 * allIssues / 100);
        var mulheres = 100 - homens;


        chart.data = [{
          key: 'homens',
          y: homens
        },
          {
            key: 'mulheres',
            y: mulheres
          }]*/
      },
      controllerAs: 'chart'
    };

});