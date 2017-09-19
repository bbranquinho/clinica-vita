"use strict";



angular.module('clinica')

    .controller('EscalaCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$mdUtil)  {
        /*show Menu*/
        $rootScope.statusMenu = true;

        /*Url de Escala*/
        var escalaUrl = SERVICE_PATH.PRIVATE_PATH + '/escala';
        
        $scope.tabIndex = 0;

        /*Escala View*/
        $scope.escala = {};
        $scope.escalas = [];
        $scope.user = {};
        $scope.medico = [];
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
                fullscreen: useFullScreen


            }).then(function(escala) {

                $scope.escalas.push(escala);


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        var userUrl = SERVICE_PATH.PRIVATE_PATH + '/usuario/findCurrentUser';
        var currentMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/findCurrentUser';


        RestSrv.find(userUrl, function (status, data) {
            $scope.user = data;
            console.log($scope.user);

            if($scope.user != null && $scope.user != undefined){

                if($scope.user[0].permissoes[0].role === "ROLE_MEDICO"){
                    RestSrv.find(currentMedicoUrl, function (status, data) {
                        $scope.medico = data[0];
                        console.log($scope.medico);
                        var escalaMedicoUrl = SERVICE_PATH.PRIVATE_PATH + '/escala_atendimento/findByMedico/'+ $scope.medico.id;
                        RestSrv.find(escalaMedicoUrl, function (status, data) {
                            $scope.itensEscala = data.data;
                            console.log(data);
                        });



                    });



                }


            }


        });



    });

