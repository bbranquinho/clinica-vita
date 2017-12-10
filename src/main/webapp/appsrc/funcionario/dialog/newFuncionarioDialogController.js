"use strict";


angular.module('clinica')
    .controller('NewFuncionarioDialogController', function (
        $scope,$mdDialog,$mdMedia,_addFuncionario,$http,
        SERVICE_PATH,RestSrv,$mdToast,FormatDate,FindCep,_funcionario_aux) {


        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
       //$scope.buttonTab = false;
        $scope.funcionario = {};
        $scope.permissoes = [];

        if(_funcionario_aux != null) {
            $scope.funcionario = _funcionario_aux;
        }



        Date.prototype.subYear = function(years){
            this.setYear(this.getYear() - years)
        };


        $scope.dataMaximaNascimento  = new Date();
        $scope.dataMaximaNascimento.subYear(18);

        $scope.dataMaximaAdmissao = new Date();

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


        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/sexos';
       // var cidadeUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/cidades';
        var estadoUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/estados';
        var registroProfissionalUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/registrosprofissionais';
        var cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';
        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';
        var permissaoUrl = SERVICE_PATH.PRIVATE_PATH + '/permissao';
        var matriculaFuncionarioUrl = SERVICE_PATH.PRIVATE_PATH + '/funcionario/matriculafuncionario';




        $scope.formattedDate = function(fieldData) {
            if($scope.funcionario === undefined){
                $scope.funcionario = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.funcionario.dataNascimento = FormatDate.format($scope.dataNascimento);

            }
            if(fieldData === 'dataAdmissao'){
                $scope.funcionario.dataAdmissao = FormatDate.format($scope.dataAdmissao);
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

            RestSrv.find(matriculaFuncionarioUrl, function(status,data) {
                    $scope.funcionario.matricula = data[0];
                    console.log(data);



            });

            RestSrv.find(permissaoUrl, function(status,data) {
                $scope.permissoes = data;
                console.log(data);



            });

        }






        $scope.$watch('funcionario.cep',
            function () {
                if($scope.funcionario.cep !== undefined){
                    var size = $scope.funcionario.cep.length;
                    if (size >= 10) {
                        $scope.funcionario.rua = undefined;
                        $scope.funcionario.cidade = undefined;
                        $scope.funcionario.bairro = undefined;
                        $scope.funcionario.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacpf();
                        }
                    }
                }

            });
        
        function buscacpf() {

            FindCep.buscacpf($scope.funcionario.cep)
                .then(function(response){
                    $scope.funcionario.rua = response.logradouro;
                    $scope.funcionario.cidade = response.localidade;
                    $scope.funcionario.bairro = response.bairro;
                    $scope.funcionario.estado = response.uf;

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
            if($scope.funcionario === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(funcionarioUrl, $scope.funcionario, function(status,data) {

                    if(status ==='ok'){

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;

                        showCustomSuccessToast('Sucesso','funcionario(a) \'' + $scope.funcionario.user.nome + '\' adicionado(a).');

                        return  $mdDialog.hide(data.data);
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
                return $scope.funcionario;
            }


        }

        var _funcionario = $scope.funcionario;
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

                    _addFuncionario(null,_funcionario);

            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.funcionario  = _funcionario ;
                 _addFuncionario(null,_funcionario);



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

            }).then(function(setor) { // * Obs fazer de outra forma

                            _addFuncionario(null,_funcionario);


            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.funcionario  = _funcionario ;
                _addFuncionario(null,_funcionario);



            });


        };


    });