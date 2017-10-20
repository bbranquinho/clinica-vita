"use strict";



angular.module('clinica')

    .controller('EscalaCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$mdUtil,$timeout)  {
        /*show Menu*/
        $rootScope.statusMenu = true;

        /*Url de Escala*/
        var escalaUrl = SERVICE_PATH.PRIVATE_PATH + '/escala';

        $scope.tabIndex = 0;

        /*Escala View*/
        $scope.escala = {};
        $scope.escalas = [];
        $scope.user = {};
        $scope.medico = {};
        $scope.medicos = [];
        $scope.itemEscala = {};
        $scope.itensEscala = [];





        /*Scroll*/
        $scope.scrollTop = function() {

            var mainContentArea = document.querySelector("[role='main']");
            var scrollContentEl = mainContentArea.querySelector('#content');
            console.log(scrollContentEl);
            console.log('oi');
            $mdUtil.animateScrollTo(scrollContentEl, 0, 200);
        }

        var itemEscalaUrl = SERVICE_PATH.PRIVATE_PATH + '/item_escala_atendimento';

        /*Open Normal Toast*/
        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };
        /* Fim Open Normal Toast*/


        /*Dialog Delete Confirm*/
        $scope.showConfirm = function(ev,item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir esta Escala?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Escala')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(itemEscalaUrl, item, function(status,data) {

                    $scope.itensEscala.splice($scope.itensEscala.indexOf(itemEscalaUrl), 1);
                    openToast('Item \'' + item.diaSemana + '\' deletada.', 'success');

                });

            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /* Fim Dialog Delete Confirm*/


        /*Dialog*/
        var mdDialog = $mdDialog;
        this.cancel = $mdDialog.cancel;




        $scope.addEscala = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            mdDialog.show({
                templateUrl: 'appsrc/escala/dialog/newEscalaDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewEscalaDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    medico_escala: $scope.medico
                }


            }).then(function(escala) {
                var escalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/escala_atendimento/findByMedico/'+ $scope.medico.id;
                RestSrv.find(escalaMedicoUrl, function (status, data) {
                    $scope.escala = data.data;
                    console.log(data);
                });

                for(let i in escala){
                    $scope.itensEscala.push(escala[i]);
                }



            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        $scope.editEscala = function($event) {
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            mdDialog.show({
                templateUrl: 'appsrc/escala/dialog/editEscalaDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditEscalaDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _itens_escala: $scope.itensEscala
                }


            }).then(function(escala) {

                var escalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/escala_atendimento/findByMedico/'+ $scope.medico.id;
                RestSrv.find(escalaMedicoUrl, function (status, data) {
                    $scope.escala = data.data;
                    console.log(data);
                });
                $scope.itensEscala = [];
                console.log($scope.itensEscala);
                for(let i in escala){
                    $scope.itensEscala.push(escala[i]);
                }


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };

        $scope.editItemEscala = function($event,item) {
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            mdDialog.show({
                templateUrl: 'appsrc/escala/dialog/editItemEscalaDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditItemEscalaDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _item_escala: item
                }


            }).then(function(itemEscala) {

                var escalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/escala_atendimento/findByMedico/'+ $scope.medico.id;
                RestSrv.find(escalaMedicoUrl, function (status, data) {
                    $scope.escala = data.data;
                    console.log(data);
                });
                for(var i = 0 ; i < $scope.itensEscala.length; i++){
                    if($scope.itensEscala[i].id === itemEscala.id) {
                        $scope.itensEscala[i] = itemEscala;
                    }
                }



            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        var userUrl = SERVICE_PATH.PRIVATE_PATH + '/usuario/findCurrentUser';
        var currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';

        $scope.data_loading = true;

        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);



            if($scope.user != null && $scope.user != undefined){

                if($scope.user[0].permissoes[0].role === "ROLE_MEDICO"){
                    RestSrv.find(currentMedicoUrl, function (status, data) {


                        $scope.medico = data[0];
                        console.log($scope.medico);
                        var itemEscalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/item_escala_atendimento/findByMedico/'+ $scope.medico.id;
                        RestSrv.find(itemEscalaMedicoUrl, function (status, data) {
                            $timeout(function(){ // give delay for good UI

                                $scope.data_loading = true;
                                $scope.itensEscala = data.data;
                                console.log(data);

                                $scope.data_loading = false;

                            }, 1000);

                            var escalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/escala_atendimento/findByMedico/'+ $scope.medico.id;
                            RestSrv.find(escalaMedicoUrl, function (status, data) {
                                $scope.escala = data.data;
                                console.log(data);
                            });
                        });



                    });



                }


            }


        });



    });

