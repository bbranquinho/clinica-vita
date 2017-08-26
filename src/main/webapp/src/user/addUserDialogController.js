"use strict";

angular.module('clinica')
    .controller('AddUserDialogController', function ($scope,$mdDialog) {


        $scope.avatars = [
                'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];


        $scope.cancelar = function(){
            
            return $mdDialog.cancel();

        };

        $scope.salvar = function() {
           
                if($scope.user === undefined){
                    return $mdDialog.cancel();
                }else{
                    return  $mdDialog.hide($scope.user);
                }


        }


    });