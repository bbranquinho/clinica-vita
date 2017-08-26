
  angular.module('clinica')
    .controller('DashboardDirectiveController', function ($scope, $mdDialog, $mdMedia,$rootScope) {

      $scope.hasAnyPermission = function(authorities) {
        var hasPermission = false;

        $rootScope.authDetails.permissions.forEach(function(permission) {
          authorities.forEach(function(authority) {
            if (permission.authority === authority) {
              hasPermission = true;
            }
          });
        });



        return hasPermission;
      };



      /*

            var startColumn, startGadgetIndex, modelCopy, newGadgetIndex;

            $scope.isEdited = false;
            $scope.newGadgets = [];

            //Check if model has nextId field
            checkId();

            $scope.widgetsList = $scope.widgetsList;
            $scope.onSave = $scope.onSave;















            function changeStructure(newModel) {
              $scope.dashboardModel = angular.copy(newModel);
            }

            function checkId() {
              if (angular.isUndefined($scope.dashboardModel.nextId)) {
                var id = 1;

              /!*  _.each($scope.dashboardModel.rows, function (row) {
                  _.each(row.columns, function (col) {
                    _.each(col.gadgets, function (gadget) {
                      gadget.id = id;
                      id++;
                    });
                  });
                });*!/

                $scope.dashboardModel.nextId = id;
                console.log('no id', $scope.dashboardModel);
              } else {
                console.log('has id');
              }
            }
      */

});
