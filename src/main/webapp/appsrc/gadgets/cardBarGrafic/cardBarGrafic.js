
  angular.module('clinica').directive('cardBarGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardBarGrafic/cardBarGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@",
        url: "@",
        paramsX: "="
      },
      controller: function ($scope,SERVICE_PATH,RestSrv) {
          $scope.data = [];
          $scope.labels = [];
          RestSrv.find( $scope.url , function (status, data) {
               console.log(data);

               $scope.data.push(data.Feminino);
               $scope.data.push(data.Masculino);

               preencheLabels($scope.paramsX);
          });

          Date.prototype.addMonth = function(month){
              this.setMonth(this.getMonth() + month)
          };

          Date.prototype.subMonth = function(month){
              this.setMonth(this.getMonth() - month)
          };





          /*Subtrai 7 meses da data atual*/
          function preencheLabels(labels) {
              let dataAtual  = new Date();
              console.log(dataAtual);
              dataAtual.subMonth(7);
              console.log(dataAtual);

              //meses = new Array("JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ");

              for(let i = 0; i <7; i++){
                  $scope.labels.push(labels[dataAtual.getMonth()]);
                  console.log($scope.labels[i]);
                  dataAtual.addMonth(1);
              }
          }


        //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Feminino', 'Masculino'];

        /*$scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];*/



      },
      controllerAs: 'chart'
    };

});