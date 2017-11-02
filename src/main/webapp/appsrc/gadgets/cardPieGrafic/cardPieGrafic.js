
  angular.module('clinica').directive('cardPieGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardPieGrafic/cardPieGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@",
        url: "@",
        params: "="
      },
       controller: function ($scope,SERVICE_PATH,RestSrv) {
            $scope.data = [];
            $scope.labels = [];
            RestSrv.find( $scope.url , function (status, data) {
                console.log(data);
                for(let i in data.Solicitacoes){
                    $scope.data[i] = data.Solicitacoes[i];
                    $scope.labels[i] = $scope.params[i];
                }
               // $scope.data.push(data.Solicitacoes);
                //$scope.labels.push($scope.params);




            });
        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.data = [300, 500, 100];
        
      },
      controllerAs: 'chart'
    };

});