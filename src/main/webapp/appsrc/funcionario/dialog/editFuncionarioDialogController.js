"use strict";

angular.module('clinica')
    .controller('EditFuncionarioDialogController', function (
        $scope,$mdDialog,$mdMedia, $rootScope ,_editarFuncionario,_editFuncionario,
        $http,SERVICE_PATH,RestSrv,$mdToast,StrToDate,FormatDate,FindCep,_editarfuncionario_aux) {

        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
        //$scope.buttonTab = false;
        $scope.editarFuncionario = {};
        $scope.selectedCheckbox = [];

        if(_editarfuncionario_aux != null) {
            $scope.editarFuncionario = _editarfuncionario_aux;

        }

        Date.prototype.subYear = function(years){
            this.setYear(this.getYear() - years)
        };


        $scope.dataMaximaNascimento  = new Date();
        $scope.dataMaximaNascimento.subYear(18);

        $scope.dataMaximaAdmissao = new Date();


        $scope.tabIndexControll = function() {

            $scope.tabIndex++;

            if($scope.tabIndex > 1) {
                $scope.tabIndex = 0;

            }

        };



        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];

        $scope.editarFuncionario = [];

        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/sexos';
        var cidadeUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/cidades';
        var estadoUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/estados';
        var registroProfissionalUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/registrosprofissionais';
        var cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';
        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';
        var permissaoUrl = SERVICE_PATH.PRIVATE_PATH + '/permissao';



        $scope.formattedDate = function(fieldData) {
            if($scope.funcionario === undefined){
                $scope.funcionario = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.editarFuncionario.dataNascimento = FormatDate.format($scope.dataNascimento);
                
            }
            if(fieldData === 'dataAdmissao'){
                $scope.editarFuncionario.dataAdmissao = FormatDate.format($scope.dataAdmissao);
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

            RestSrv.find(permissaoUrl, function(status,data) {
                $scope.permissoes = data;
                console.log(data);



            });





            $scope.dataNascimento = StrToDate.stringToDate(_editarFuncionario[0].dataNascimento);
            console.log('dataNascimento:');
            console.log($scope.dataNascimento);

            $scope.dataAdmissao = StrToDate.stringToDate(_editarFuncionario[0].dataAdmissao);
            console.log('dataAdmissao:');
            console.log($scope.dataAdmissao);

            $scope.editarFuncionario = angular.copy(_editarFuncionario[0]);
            //$scope.selectedCheckbox = $scope.editarFuncionario.user.permissoes;

        }



        /*Checkbox*/

        $scope.toggle = function (item, list) {


            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                if($scope.editarFuncionario.user === undefined){
                    var user = {user:{}};
                    var permissoes = {permissoes:[]}
                    angular.extend($scope.editarFuncionario, user);
                    angular.extend($scope.editarFuncionario.user,permissoes);
                }


                list.push(item);
                $scope.editarFuncionario.user.permissoes = list;
            }

        };

        $scope.exists = function (item, list, model) {
            if(list != undefined){
                if(list.indexOf(item) > -1){
                    alert('oi');
                }
                return list.indexOf(item) > -1;
            }

        };
        /*/!*Fim Checkbox*!*!/*/


        $scope.$watch('editarFuncionario.cep',
            function () {
                if($scope.editarFuncionario.cep !== undefined){
                    var size = $scope.editarFuncionario.cep.length;
                    if (size >= 10) {
                        $scope.editarFuncionario.rua = undefined;
                        $scope.editarFuncionario.cidade = undefined;
                        $scope.editarFuncionario.bairro = undefined;
                        $scope.editarFuncionario.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacpf();
                        }
                    }
                }

            });

        function buscacpf() {

            FindCep.buscacpf($scope.editarFuncionario.cep)
                .then(function(response){
                    $scope.editarFuncionario.rua = response.logradouro;
                    $scope.editarFuncionario.cidade = response.localidade;
                    $scope.editarFuncionario.bairro = response.bairro;
                    $scope.editarFuncionario.estado = response.uf;

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


        var funcionarioUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario';

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

        $scope.salvar = function() {
            console.log('ola');
            if($scope.editarFuncionario === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.edit(funcionarioUrl, $scope.editarFuncionario, function(status, data){
                    if(status ==='ok'){



                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;

                        showCustomSuccessToast('Sucesso','funcionario(a) \'' + $scope.editarFuncionario.user.nome + '\' atualizado(a).');
                        return  $mdDialog.hide($scope.editarFuncionario);
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
                    return $scope.editarFuncionario;
            }


        }


        var _funcionario = $scope.editarFuncionario;
        $scope.addCargo = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));



            $scope.cancelar();

            mdDialog.show({
                templateUrl: 'appsrc/cargo/dialog/newCargoDialog.html',
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

                            $mdToast.show($mdToast.simple()
                                .textContent('cargo \'' + cargo.nome + '\' added.', 'success')
                                .position('top right')
                                .hideDelay(3000));

                            // $scope.funcionario  = _funcionario ;
                            _editFuncionario(null,_funcionario);

                        }else{

                            console.log(data);
                        }

                    });
                }


            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.funcionario  = _funcionario ;
                _editFuncionario(null,_funcionario);



            });


        };



        $scope.addSetor = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));



            $scope.cancelar();

            mdDialog.show({
                templateUrl: 'appsrc/setor/dialog/newSetorDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewSetorDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen

            }).then(function(setor) {


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


                            $mdToast.show($mdToast.simple()
                                .textContent('setor \'' + setor.nome + '\' added.', 'success')
                                .position('top right')
                                .hideDelay(3000));

                            // $scope.funcionario  = _funcionario ;
                            _editFuncionario(null,_funcionario);

                        }else{

                            console.log(data);
                        }

                    });
                }


            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.funcionario  = _funcionario ;
                _editFuncionario(null,_funcionario);
                
            });


        };

    });