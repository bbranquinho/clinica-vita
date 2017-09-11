
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



});
