"use strict";


angular.module('clinica')
    .controller('NewMedicoDialogController', function (
        $scope,$mdDialog,$mdMedia,_addMedico,$http,
        SERVICE_PATH,RestSrv,$mdToast,FormatDate,FindCep,_medico_aux) {


        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
       //$scope.buttonTab = false;
        $scope.medico = {};

        if(_medico_aux != null) {
            $scope.medico = _medico_aux;
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


        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/sexos';
       // var cidadeUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/cidades';
        var estadoUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/estados';
        var registroProfissionalUrl = SERVICE_PATH.PRIVATE_PATH + '/medico/registrosprofissionais';
        var cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';
        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';


        $scope.formattedDate = function(fieldData) {
            if($scope.medico === undefined){
                $scope.medico = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.medico.dataNascimento = FormatDate.format($scope.dataNascimento);

            }
            if(fieldData === 'dataAdmissao'){
                $scope.medico.dataAdmissao = FormatDate.format($scope.dataAdmissao);
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

        }





        $scope.$watch('medico.cep',
            function () {
                if($scope.medico.cep !== undefined){
                    var size = $scope.medico.cep.length;
                    if (size >= 10) {
                        $scope.medico.rua = undefined;
                        $scope.medico.cidade = undefined;
                        $scope.medico.bairro = undefined;
                        $scope.medico.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacpf();
                        }
                    }
                }

            });
        
        function buscacpf() {

            FindCep.buscacpf($scope.medico.cep)
                .then(function(response){
                    $scope.medico.rua = response.logradouro;
                    $scope.medico.cidade = response.localidade;
                    $scope.medico.bairro = response.bairro;
                    $scope.medico.estado = response.uf;

                }).catch(function(error) {
                console.log(error);
                throw error;
            })

        };



        var mdDialog = $mdDialog;

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
            if($scope.medico === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(medicoUrl, $scope.medico, function(status,data) {

                    if(status ==='ok'){
                        //$scope.medicos.push(data.data);
                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


                        showCustomSuccessToast('Sucesso','medico(a) \'' + $scope.medico.user.nome + '\' adicionado(a).');
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

               // return  $mdDialog.hide($scope.medico);
                return $scope.medico;
            }


        }




        var _medico = $scope.medico;
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

            }).then(function(cargo) {

                _addMedico(null,_medico);

            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.medico  = _medico ;
                 _addMedico(null,_medico);


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

                _addMedico(null,_medico);

            }, function () {
                console.log('You cancelled the dialog.');
                //$scope.medico  = _medico ;
                _addMedico(null,_medico);
                

            });


        };


    });