'use strict';

angular.module('clinica')
    .controller('LoginCtrl', function ($scope, LoginLogoutSrv,$rootScope,$timeout,$mdDialog,SERVICE_PATH,$mdMedia,RestSrv,$mdToast, $mdUtil) {
        $rootScope.statusMenu = false;

        /*view scrow button*/
        $scope.scrollTop = function() {

            var mainContentArea = document.querySelector("[role='main']");
            var scrollContentEl = mainContentArea.querySelector('#content');
            console.log(scrollContentEl);
            console.log('oi');
            $mdUtil.animateScrollTo(scrollContentEl, 0, 200);
        }
        
        var pacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente';
        $scope.submit_loading = false;
        var status_login;
            $scope.login = function(email, password) {
                $timeout(function(){
                    $scope.submit_loading = true;
                    status_login =  LoginLogoutSrv.login(email, password);
                   // console.log(status_login);
                    $timeout(function(){ 
                        if(!status_login){
                            $scope.submit_loading = false;
                        }
                    }, 2000);


                }, 1000);
                


            };

        var mdDialog = $mdDialog;

        $scope.paciente = {};
        $scope.pacientes = [];



        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };

        $scope.formPacienteScope = [];
        $scope.setFormNewPacienteScope = function(scope) {
            $scope.formPacienteScope = scope;

        };


        $scope.addPaciente = function($event,paciente_aux) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log('paciente:');
            console.log(paciente_aux);
            if(paciente_aux != null){
                $scope.paciente = paciente_aux;
            }
            mdDialog.show({
                templateUrl: 'src/paciente/dialog/newPacienteDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewPacienteDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _addPaciente: $scope.addPaciente,
                    _paciente_aux: paciente_aux
                }

            }).then(function(paciente) { // * Obs fazer de outra forma



                /* $scope.formPacienteScope.newPacienteForm.$setUntouched();
                 $scope.formPacienteScope.newPacienteForm.$setPristine();*/

                if(paciente.id){
                    RestSrv.edit(pacienteUrl, paciente, function(status, data){
                        if(status ==='ok'){

                            for(var i = 0 ; i < $scope.pacientes.length; i++){
                                if($scope.pacientes[i].id === pacientes.id) {
                                    $scope.pacientes[i] = paciente;
                                }
                            }

                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;
                            openToast('paciente \'' + paciente.user.nome + '\' updated.', 'success');

                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                        }


                    });

                }else{
                    /*paciente.dataNascimento = formattedDate(paciente.dataNascimento);
                     paciente.dataAdmissao =  formattedDate(paciente.dataAdmissao);
                     console.log('paciente:');
                     console.log(paciente);

                     // var d = new Date(date || Date.now()),
                     //console.log( date);*/



                    RestSrv.add(pacienteUrl, paciente, function(status,data) {

                        if(status ==='ok'){
                            $scope.pacientes.push(data.data);
                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;


                            openToast('Paciente \'' + paciente.user.nome + '\'criado com sucesso.', 'success');
                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                            console.log(data);
                        }

                    });
                }


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };



    });
