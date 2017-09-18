"use strict";


angular.module('clinica')

    .controller('NewEscalaDialogController', function ($mdDialog, $scope, $mdMedia, $mdToast, $q, $timeout, RestSrv, SERVICE_PATH, $rootScope, $mdUtil) {






        $scope.selectedStep = 0;
        $scope.stepProgress = 1;
        $scope.maxStep = 3;
        $scope.showBusyText = false;
        $scope.stepData = [
            { step: 1, completed: false, optional: false, data: {} },
            { step: 2, completed: false, optional: false, data: {} },
            { step: 3, completed: false, optional: false, data: {} },
        ];

         $scope.enableNextStep = function nextStep() {
                //do not exceed into max step
                if ($scope.selectedStep >= $scope.maxStep) {
                    return;
                }
                //do not increment $scope.stepProgress when submitting from previously completed step
                if ($scope.selectedStep === $scope.stepProgress - 1) {
                    $scope.stepProgress = $scope.stepProgress + 1;
                }
                $scope.selectedStep = $scope.selectedStep + 1;
            }

            $scope.moveToPreviousStep = function moveToPreviousStep() {
                    if ($scope.selectedStep > 0) {
                        $scope.selectedStep = $scope.selectedStep - 1;
                    }
                }

        $scope.submitCurrentStep = function submitCurrentStep(stepData, isSkip) {
                var deferred = $q.defer();
                $scope.showBusyText = true;
                console.log('On before submit');
                if (!stepData.completed && !isSkip) {
                    //simulate $http
                    $timeout(function () {
                        $scope.showBusyText = false;
                        console.log('On submit success');
                        deferred.resolve({ status: 200, statusText: 'success', data: {} });
                        //move to next step when success
                        stepData.completed = true;
                        $scope.enableNextStep();
                    }, 1000)
                } else {
                    $scope.showBusyText = false;
                    $scope.enableNextStep();
                }
            }



        /*show/hide columns*/
        $scope.indeter = false;
        $scope.columns = [
            {status: true, name: 'Segunda-Feira'},
            {status: true, name: 'Terça-Feira'},
            {status: true, name: 'Quarta-Feira'},
            {status: true, name: 'Quinta-Feira'},
            {status: true, name: 'Sexta-Feira'},
            {status: true, name: 'Sábado'},
            {status: true, name: 'Domingo'}


        ];

        $scope.horarios =
            {manha:['08:00','09:00','10:00'],
             tarde:['13:00','14:00','15:00']};

        $scope.intervalo = false;

        $scope.selected = [];

        $scope.escala = {};
        $scope.escala.itemEscalaAtendimento = [
            {diaSemana : 'Segunda Feira'}
        ];
        $scope.teste = "leonardo";


        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.cancelar = function () {
            return $mdDialog.cancel();
        }

        var escalaUrl = SERVICE_PATH.PRIVATE_PATH + '/escala';


        $scope.salvar = function () {
            if ($scope.escala === undefined) {
                return $mdDialog.cancel();

            } else {

                RestSrv.add(escalaUrl, $scope.escala, function (status, data) {
                    if (status === 'ok') {

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.Message;

                        return $mdDialog.hide(data.data);

                    } else {
                        $scope.statusError = 'unsuccess';
                        $scope.messages = data.fildsErrorMessages;
                        if (data.message != null || data.message != undefined) {
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }
                });

                return $scope.escala;
            }
        }
    });