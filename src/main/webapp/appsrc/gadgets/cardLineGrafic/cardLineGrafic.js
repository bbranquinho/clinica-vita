
  angular.module('clinica').directive('cardLineGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardLineGrafic/cardLineGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        url: "@",
        paramsX: "="
      },
      controller: function  ($scope, $timeout,SERVICE_PATH,RestSrv){
          $scope.series = ['Consultas'];
              $scope.data = [];
              $scope.labels = [];
              RestSrv.find( $scope.url , function (status, data) {
                  console.log(data);
                  //$timeout(function () {
                      $scope.data.push(data.Consultas);
                  //}, 3000);



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



                  for(let i = 0; i <7; i++){
                      $scope.labels.push(labels[dataAtual.getMonth()]);
                      console.log($scope.labels[i]);
                      dataAtual.addMonth(1);
                  }
              }


              //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];







      /*

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

        */
      },
      controllerAs: 'chart'
    };

});