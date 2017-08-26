"use strict";

angular.module('clinica')
    .controller('EditPacienteDialogController', function (
        $scope,$mdDialog,$mdMedia, $rootScope ,_editarPaciente,_editPaciente,
        $http,SERVICE_PATH,RestSrv,$mdToast,StrToDate,FormatDate,FindCep,_editarpaciente_aux) {

        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
        //$scope.buttonTab = false;
        $scope.editarPaciente = {};

        if(_editarpaciente_aux != null) {
            $scope.editarPaciente = _editarpaciente_aux;
        }


        $scope.tabIndexControll = function() {

            if($scope.tabIndex == 0){
                $scope.tabIndex++;
                $scope.tabControl = '<';
                $scope.tabToolTip = 'Anterior';
            }else{
                $scope.tabIndex--;
                $scope.tabControl = '>';
                $scope.tabToolTip = 'Proximo';
            }

        };



        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];

        $scope.editarPaciente = [];

        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/sexos';

        var escolaridadeUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/escolaridades';
        var estadoCivilUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/estadoscivis';
        var etniaUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/etnias';
        var fatorSanguineoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/fatoressanguineos';



        $scope.formattedDate = function(fieldData) {
            if($scope.paciente === undefined){
                $scope.paciente = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.editarPaciente.dataNascimento = FormatDate.format($scope.dataNascimento);
                
            }
            if(fieldData === 'dataAdmissao'){
                $scope.editarPaciente.dataAdmissao = FormatDate.format($scope.dataAdmissao);
            }


        };


        $scope.getEnuns = function() {

            RestSrv.find(sexoUrl, function (status, data) {
                $scope.sexos = data;
                console.log(data);

            });

            RestSrv.find(escolaridadeUrl, function (status, data) {
                $scope.escolaridades = data;
                console.log(data);

            });

            RestSrv.find(estadoCivilUrl, function (status, data) {
                $scope.estadosCivis = data;
                console.log(data);

            });

            RestSrv.find(etniaUrl, function (status, data) {
                $scope.etnias = data;
                console.log(data);

            });

            RestSrv.find(fatorSanguineoUrl, function (status, data) {
                $scope.fatoresSanguineos = data;
                console.log(data);

            });


            /**/


            $scope.dataNascimento = StrToDate.stringToDate(_editarPaciente[0].dataNascimento);
            console.log('dataNascimento:');
            console.log($scope.dataNascimento);

            /*$scope.dataAdmissao = StrToDate.stringToDate(_editarPaciente[0].dataAdmissao);
            console.log('dataAdmissao:');
            console.log($scope.dataAdmissao);*/

            $scope.editarPaciente = angular.copy(_editarPaciente[0]);
            console.log('editarPaciente:');
            console.log( $scope.editarPaciente);
        }



        $scope.$watch('editarPaciente.cep',
            function () {
                if($scope.editarPaciente.cep !== undefined){
                    var size = $scope.editarPaciente.cep.length;
                    if (size >= 10) {
                        $scope.editarPaciente.rua = undefined;
                        $scope.editarPaciente.cidade = undefined;
                        $scope.editarPaciente.bairro = undefined;
                        $scope.editarPaciente.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacpf();
                        }
                    }
                }

            });

        function buscacpf() {

            FindCep.buscacpf($scope.editarPaciente.cep)
                .then(function(response){
                    $scope.editarPaciente.rua = response.logradouro;
                    $scope.editarPaciente.cidade = response.localidade;
                    $scope.editarPaciente.bairro = response.bairro;
                    $scope.editarPaciente.estado = response.uf;

                }).catch(function(error) {
                console.log(error);
                throw error;
            })

        };

        var mdDialog = $mdDialog;

        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        };



        function showCustomErrorToast(status, mensagem) {
            $mdToast.show({
                hideDelay   : 3000, position    : 'top right',
                template : ' <md-toast> <span class="md-toast-text" style="color:#FF5252" flex ng-bind="status"></span> <p class="md-highlight"  flex ng-bind="mensagem"></p></md-toast>'});
        };
        function showCustomSuccessToast(status, mensagem) {
            $mdToast.show({
                hideDelay   : 3000, position    : 'top right',
                template : ' <md-toast> <span class="md-toast-text" style="color:#4caf50" flex >'+status +'</span> <p class="md-highlight"  flex >'+ mensagem +'</p></md-toast>'});

        };

        var pacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente';

        $scope.salvar = function() {
            console.log('ola');
            if($scope.editarPaciente === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.edit(pacienteUrl, $scope.editarPaciente, function(status, data){
                    if(status ==='ok'){



                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;
                        showCustomSuccessToast('Sucesso','paciente \'' + $scope.editarPaciente.user.nome + '\' adicionado.');
                        return  $mdDialog.hide($scope.editarPaciente);
                    }else{
                        $scope.statusError = 'unsuccess';
                        $scope.messages = data.fieldsErrorMessages;
                        if(data.message != null || data.message != undefined){
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }


                });


                return $scope.editarPaciente;
            }


        }


        var _paciente = $scope.editarPaciente;
        $scope.addCargo = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));



            $scope.cancelar();

            mdDialog.show({
                templateUrl: 'src/cargo/dialog/newCargoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewCargoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen

            }).then(function(cargo) { // * Obs fazer de outra forma



                /* $scope.formCargoScope.newCargoForm.$setUntouched();
                 $scope.formCargoScope.newCargoForm.$setPristine();*/

                if(cargo.id){
                    RestSrv.edit(cargoUrl, cargo, function(status, data){
                        if(status ==='ok'){

                            for(var i = 0 ; i < $scope.cargos.length; i++){
                                if($scope.cargos[i].id === cargos.id) {
                                    $scope.cargos[i] = cargo;
                                }
                            }

                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;
                            openToast('cargo \'' + cargo.nome + '\' updated.', 'success');

                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                        }


                    });

                }else{


                    RestSrv.add(cargoUrl, cargo, function(status,data) {

                        if(status ==='ok'){
                            /*$scope.cargos.push(data.data);
                             $scope.statusError = 'success';
                             $scope.message = data.atributeMessage.MENSAGEM;
                             */



                            $mdToast.show($mdToast.simple()
                                .textContent('cargo \'' + cargo.nome + '\' added.', 'success')
                                .position('top right')
                                .hideDelay(3000));

                            // $scope.paciente  = _paciente ;
                            _editPaciente(null,_paciente);

                        }else{
                            /*$scope.statusError = 'unsuccess';
                             $scope.messages = data.fieldsErrorMessages;
                             $scope.fields = data.mapOfFields;*/
                            console.log(data);
                        }

                    });
                }


            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.paciente  = _paciente ;
                _editPaciente(null,_paciente);



            });


        };



        $scope.addSetor = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));



            $scope.cancelar();

            mdDialog.show({
                templateUrl: 'src/setor/dialog/newSetorDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewSetorDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen

            }).then(function(setor) { // * Obs fazer de outra forma



                /* $scope.formCargoScope.newCargoForm.$setUntouched();
                 $scope.formCargoScope.newCargoForm.$setPristine();*/

                if(setor.id){
                    RestSrv.edit(setorUrl, setor, function(status, data){
                        if(status ==='ok'){

                            for(var i = 0 ; i < $scope.setores.length; i++){
                                if($scope.setores[i].id === setores.id) {
                                    $scope.setores[i] = setor;
                                }
                            }

                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;
                            openToast('setor \'' + setor.nome + '\' updated.', 'success');

                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                        }


                    });

                }else{


                    RestSrv.add(setorUrl, setor, function(status,data) {

                        if(status ==='ok'){
                            /*$scope.cargos.push(data.data);
                             $scope.statusError = 'success';
                             $scope.message = data.atributeMessage.MENSAGEM;
                             */



                            $mdToast.show($mdToast.simple()
                                .textContent('setor \'' + setor.nome + '\' added.', 'success')
                                .position('top right')
                                .hideDelay(3000));

                            // $scope.paciente  = _paciente ;
                            _editPaciente(null,_paciente);

                        }else{
                            /*$scope.statusError = 'unsuccess';
                             $scope.messages = data.fieldsErrorMessages;
                             $scope.fields = data.mapOfFields;*/
                            console.log(data);
                        }

                    });
                }


            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.paciente  = _paciente ;
                _editPaciente(null,_paciente);



            });


        };

    });