
  angular.module('clinica').directive('cardDonutGrafic',function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'appsrc/gadgets/cardDonutGrafic/cardDonutGrafic.html',
      scope: {
        name: '@',
        color: '@',
        icon: "@",
        title: "@",
        colorTitle: "@",
        bodyA: "@",
        bodyB: "@",
        url: "@",
        paramsUrl: "="

      },
      controller: function ($scope, $timeout,SERVICE_PATH,RestSrv) {
          $scope.data = [];
          $scope.labels = [];

              let urlParam1 = $scope.url + $scope.paramsUrl[0];
              let urlParam2 = $scope.url + $scope.paramsUrl[1];
              RestSrv.find( urlParam1 , function (status, data) {
                $scope.data[0] = data;
                $scope.labels[0] = $scope.paramsUrl[0];
                  console.log($scope.data);
                  console.log($scope.labels);
                  RestSrv.find( urlParam2 , function (status, data) {
                      $scope.data[1] = data;
                      $scope.labels[1] = $scope.paramsUrl[1];
                      console.log($scope.data);
                      console.log($scope.labels);

                  });
              });





        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.data = [300, 500, 100];
        
      },
      controllerAs: 'chart'
    };

});