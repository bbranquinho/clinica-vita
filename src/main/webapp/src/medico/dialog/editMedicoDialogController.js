"use strict";

angular.module('clinica')
    .controller('EditMedicoDialogController', function (
        $scope,$mdDialog,$mdMedia, $rootScope ,_editarMedico,_editMedico,
        $http,SERVICE_PATH,RestSrv,$mdToast,StrToDate,FormatDate,FindCep,_editarmedico_aux) {


        $scope.hasAnyPermission = function(authorities) {
            var hasPermission = false;

            $rootScope.authDetails.permissions.forEach(function(permission) {
                authorities.forEach(function(authority) {
                    if (permission.authority === authority) {
                        hasPermission = true;
                    }
                });
            });



            return hasPermission;
        };

        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
        //$scope.buttonTab = false;
        $scope.editarMedico = {};

        if(_editarmedico_aux != null) {
            $scope.editarMedico = _editarmedico_aux;
        }


        $scope.tabIndexControll = function() {

            $scope.tabIndex++;

            if($scope.tabIndex > 1) {
                $scope.tabIndex = 0;

            }

        };



        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];

        $scope.editarMedico = [];

        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/sexos';
        var cidadeUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/cidades';
        var estadoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/estados';
        var registroProfissionalUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/registrosprofissionais';
        var cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';
        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';



        $scope.formattedDate = function(fieldData) {
            if($scope.medico === undefined){
                $scope.medico = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.editarMedico.dataNascimento = FormatDate.format($scope.dataNascimento);
                
            }
            if(fieldData === 'dataAdmissao'){
                $scope.editarMedico.dataAdmissao = FormatDate.format($scope.dataAdmissao);
            }


        };


        $scope.getEnuns = function() {

            RestSrv.find(sexoUrl, function (status, data) {
                $scope.sexos = data;
                console.log(data);

            });

            RestSrv.find(estadoUrl, function (status, data) {
                $scope.estados = data;
                console.log(data);

            });

            RestSrv.find(registroProfissionalUrl, function (status, data) {
                $scope.registrosProfissionais = data;
                console.log(data);

            });

            RestSrv.find(cargoUrl, function (status, data) {
                $scope.tipoCargos = data;
                console.log(data);

            });

            RestSrv.find(setorUrl, function (status, data) {
                $scope.tipoSetores = data;
                console.log(data);

            });


            /**/


            $scope.dataNascimento = StrToDate.stringToDate(_editarMedico[0].dataNascimento);
            console.log('dataNascimento:');
            console.log($scope.dataNascimento);

            $scope.dataAdmissao = StrToDate.stringToDate(_editarMedico[0].dataAdmissao);
            console.log('dataAdmissao:');
            console.log($scope.dataAdmissao);

            $scope.editarMedico = angular.copy(_editarMedico[0]);
            console.log('editarMedico:');
            console.log( $scope.editarMedico);
        }



        $scope.$watch('editarMedico.cep',
            function () {
                if($scope.editarMedico.cep !== undefined){
                    var size = $scope.editarMedico.cep.length;
                    if (size >= 10) {
                        $scope.editarMedico.rua = undefined;
                        $scope.editarMedico.cidade = undefined;
                        $scope.editarMedico.bairro = undefined;
                        $scope.editarMedico.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacep();
                        }
                    }
                }

            });

        function buscacep() {

            FindCep.buscacpf($scope.editarMedico.cep)
                .then(function(response){
                    $scope.editarMedico.rua = response.logradouro;
                    $scope.editarMedico.cidade = response.localidade;
                    $scope.editarMedico.bairro = response.bairro;
                    $scope.editarMedico.estado = response.uf;

                }).catch(function(error) {
                console.log(error);
                throw error;
            })

        };

        var mdDialog = $mdDialog;

        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        }


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

        $scope.cancelar = function(){
            console.log("oi");
            return $mdDialog.cancel();

        };
        var medicoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico';

        $scope.salvar = function() {
            console.log('ola');
            if($scope.editarMedico === undefined){
                return $mdDialog.cancel();
            }else{


                RestSrv.edit(medicoUrl, $scope.editarMedico, function(status, data){
                    if(status ==='ok'){



                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;
                        showCustomSuccessToast('Sucesso','medico(a) \'' + $scope.editarMedico.user.nome + '\' editado(a).');

                        return  $mdDialog.hide($scope.editarMedico);
                    }else{
                        $$scope.statusError = 'unsuccess';
                        $scope.messages = data.fieldsErrorMessages;
                        if(data.message != null || data.message != undefined){
                            $scope.message = data.message;
                        }
                        $scope.fields = data.mapOfFields;
                        console.log(data);
                    }


                });

                return  $scope.editarMedico;
            }


        }


        var _medico = $scope.editarMedico;
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

                            // $scope.medico  = _medico ;
                            _editMedico(null,_medico);

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
                //$scope.medico  = _medico ;
                _editMedico(null,_medico);



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

                            // $scope.medico  = _medico ;
                            _editMedico(null,_medico);

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
                //$scope.medico  = _medico ;
                _editMedico(null,_medico);



            });


        };

    });