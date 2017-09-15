"use strict";



angular.module('clinica')

    .controller('EscalaCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$mdUtil)  {
        /*show Menu*/
        $rootScope.statusMenu = true;

        /*Url de Escala*/
        var escalaUrl = SERVICE_PATH.PRIVATE_PATH + '/escala';
        
        $scope.tabIndex = 0;

        /*Scroll*/
        $scope.scrollTop = function() {

            var mainContentArea = document.querySelector("[role='main']");
            var scrollContentEl = mainContentArea.querySelector('#content');
            console.log(scrollContentEl);
            console.log('oi');
            $mdUtil.animateScrollTo(scrollContentEl, 0, 200);
        }



        /*Escala View*/
        $scope.escala = {};
        $scope.escalas = [];
        $scope.order = 'nome';


        /*Dialog*/
        var mdDialog = $mdDialog;
        this.cancel = $mdDialog.cancel;











    });

