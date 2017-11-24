
  angular.module('clinica').directive('cardPolarGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardPolarGrafic/cardPolarGrafic.html',
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
                for(let i in data.valorConsultas){
                    $scope.data[i] = data.valorConsultas[i];
                    $scope.labels[i] = $scope.params[i];
                }
                // $scope.data.push(data.Solicitacoes);
                //$scope.labels.push($scope.params);




            });

      },
      controllerAs: 'chart'
    };

});