"use strict";

angular.module('clinica')

    .controller('SocketCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope)  {
        $rootScope.statusMenu = true;



        $scope.init = function () {


            //var wsUri = "ws://" + document.location.host + "/ws/hello";
           // var wsUri = "ws://" + 'localhost:8080' + "/ws/chat";
          // var websocket ;

           var websocket = new WebSocket("ws://localhost:8081/ws/hello");

            websocket.onmessage = function(evt) { onMessage(evt); }
            websocket.onopen = function(evt) { onOpen(evt); }
            websocket.onclose = function(evt) { onClose(evt); }
        }

        function onMessage(evt) {
            console.log(evt)
        }

        function onOpen(evt) {
            $scope.status = "Conectado";
        }

        function onClose(evt) {
            $scope.status = "Desconectado";
        }

        

    });

