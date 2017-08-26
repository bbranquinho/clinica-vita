
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

       /* var vm = this;

        // Data
        vm.calendarEvent = calendarEvent;

        // Methods
        vm.editEvent = editEvent;
        vm.closeDialog = closeDialog;

        //////////

        /!**
         * Close the dialog
         *!/
        function closeDialog()
        {
            $mdDialog.hide();
        }

        /!**
         * Edit the calendar event
         *
         * @param calendarEvent
         *!/
        function editEvent(calendarEvent)
        {
            showEventFormDialog('edit', calendarEvent, false, false, event);
        }*/

});
