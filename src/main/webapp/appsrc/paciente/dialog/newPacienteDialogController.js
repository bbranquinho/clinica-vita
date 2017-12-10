"use strict";


angular.module('clinica')
    .controller('NewPacienteDialogController', function (
        $scope,$mdDialog,$mdMedia,_addPaciente,$http,
        SERVICE_PATH,RestSrv,$mdToast,FormatDate,FindCep,_paciente_aux, $timeout, $q ) {


        $scope.tabIndex = 0;
        $scope.tabControl = '>';
        $scope.tabToolTip = 'Proximo';
       //$scope.buttonTab = false;
        $scope.paciente = {};

        if(_paciente_aux != null) {
            $scope.paciente = _paciente_aux;
        }

        Date.prototype.subYear = function(years){
            this.setYear(this.getYear() - years)
        };


        $scope.dataMaximaNascimento  = new Date();
        $scope.dataMaximaNascimento.subYear(18);

        $scope.tabIndexControll = function() {

            $scope.tabIndex++;

            if($scope.tabIndex > 2) {
                $scope.tabIndex = 0;

            }

        };


        $scope.avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];


        var sexoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/sexos';

        var escolaridadeUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/escolaridades';
        var estadoCivilUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/estadoscivis';
        var etniaUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/etnias';
        var fatorSanguineoUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/fatoressanguineos';
        var matriculaPacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente/matriculapaciente';


        $scope.formattedDate = function(fieldData) {
            if($scope.paciente === undefined){
                $scope.paciente = {};
            }

            if(fieldData === 'dataNascimento'){

                $scope.paciente.dataNascimento = FormatDate.format($scope.dataNascimento);

            }
            if(fieldData === 'dataAdmissao'){
                $scope.paciente.dataAdmissao = FormatDate.format($scope.dataAdmissao);
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

            RestSrv.find(matriculaPacienteUrl, function(status,data) {
                $scope.paciente.matricula = data[0];
                console.log(data);



            });



        }





        $scope.$watch('paciente.cep',
            function () {
                if($scope.paciente.cep !== undefined){
                    var size = $scope.paciente.cep.length;
                    if (size >= 10) {
                        $scope.paciente.rua = undefined;
                        $scope.paciente.cidade = undefined;
                        $scope.paciente.bairro = undefined;
                        $scope.paciente.estado = undefined;

                    } else {
                        if (size > 7) {
                            buscacep();
                        }
                    }
                }

            });
        
        function buscacep() {

            FindCep.buscacpf($scope.paciente.cep)
                .then(function(response){
                    $scope.paciente.rua = response.logradouro;
                    $scope.paciente.cidade = response.localidade;
                    $scope.paciente.bairro = response.bairro;
                    $scope.paciente.estado = response.uf;

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
            if($scope.paciente === undefined){
                return $mdDialog.cancel();
            }else{

                RestSrv.add(pacienteUrl, $scope.paciente, function(status,data) {

                    if(status ==='ok'){

                        $scope.statusError = 'success';
                        $scope.message = data.atributeMessage.MENSAGEM;


      /*                  openToast('paciente \'' + paciente.nome + '\' added.', 'success');*/
                        showCustomSuccessToast('Sucesso','paciente \'' + $scope.paciente.user.nome + '\' adicionado(a).');
                        return  $mdDialog.hide($scope.paciente);
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

                return $scope.paciente;
            }


        }

        var _paciente = $scope.paciente;
       


    });