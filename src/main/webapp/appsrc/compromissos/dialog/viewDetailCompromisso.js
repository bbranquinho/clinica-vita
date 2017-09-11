
"use strict";

angular.module('clinica')

    .controller('CompromissoDetailDialogController',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH,_events) {
        $scope.calendarEvent = _events;
        

            $scope.cancelar = function(){
                    console.log("oi");
                    return $mdDialog.cancel();

            };


            $scope.salvar = function() {
                    console.log('ola');
                    if($scope.calendarEvent === undefined){
                            return $mdDialog.cancel();
                    }else{
                            return  $mdDialog.hide($scope.calendarEvent);

                    }
                
            }

      
});
