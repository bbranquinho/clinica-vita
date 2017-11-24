
  angular.module('clinica').directive('cardBarHorizontalGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardBarHorizontalGrafic/cardBarHorizontalGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@",
        url: "@"
      },
        controller: function ($scope,SERVICE_PATH,RestSrv) {
            $scope.data = [];
            $scope.labels = [];
            RestSrv.find( $scope.url , function (status, data) {
                console.log(data);

                $scope.data.push(data.Feminino);
                $scope.data.push(data.Masculino);

                preencheLabels();
            });

            Date.prototype.addYear = function(year){
                this.setFullYear(this.getFullYear() + year)
            };

            Date.prototype.subYear = function(year){
                this.setFullYear(this.getFullYear() - year)
            };





            /*Subtrai 7 meses da data atual*/
            function preencheLabels() {
                let dataAtual  = new Date();
                console.log(dataAtual);
                dataAtual.subYear(6);
                console.log(dataAtual);

                for(let i = 0; i <7; i++){
                    $scope.labels.push(dataAtual.getFullYear());
                    console.log($scope.labels[i]);
                    dataAtual.addYear(1);
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