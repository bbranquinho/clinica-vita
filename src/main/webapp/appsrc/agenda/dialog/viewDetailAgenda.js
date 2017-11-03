
"use strict";

angular.module('clinica')

    .controller('AgendaDetailDialogController',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH,_events,$rootScope) {
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

        /*Show message*/
        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };

        var cancelarAgendamentoUrl = SERVICE_PATH.PRIVATE_PATH +'/item_agenda/cancelar_agendamento/';

        /*show dialog delete registro*/
        $scope.cancelarAgenda = function(ev,calEvent) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja cancelar este Agendamento?')
                .textContent('Caso cancele será necessário realizar um novo agendamento no sistema.')
                .ariaLabel('Cancelar Agendamento')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.edit(cancelarAgendamentoUrl, calEvent.agenda, function(status,data) {

                    $rootScope.$broadcast('updateAgenda');
                    openToast('Agenda Cancelada.', 'success');

                });

            }, function() {

            });
        };


      

});
