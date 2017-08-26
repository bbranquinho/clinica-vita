"use strict";

angular.module('clinica')

    .controller('PacienteCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope,$timeout)  {
        $rootScope.statusMenu = true;
        var pacienteUrl = SERVICE_PATH.PRIVATE_PATH + '/paciente';

        $scope.paciente = {};
        $scope.pacientes = [];
        $scope.order = 'nome';

        $scope.determinateValue = 0;
        $timeout(function(){ // give delay for good UI
            while( $scope.determinateValue < 100){
                $scope.determinateValue++;
            }



        }, 1000);




        var mdDialog = $mdDialog;


        this.cancel = $mdDialog.cancel;




        var bookmark;

        $scope.selected = [];

        $scope.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.query = {
            filter: '',
            limit: '5',
            order: 'nameToLower',
            page: 1
        };


        $scope.reorder = function(campo) {
                $scope.order = campo;
        };



        /*show/hide columns*/
        $scope.indeter= false;
        $scope.columns = [
            { status: true, name: 'Id'},
            { status: true, name: 'Foto'},
            { status: true, name: 'Matricula'},
            { status: false, name: 'RG'},
            { status: false, name: 'CPF'},
            { status: false, name: 'Data Nascimento'},
            { status: false, name: 'Telefone'},
            { status: false, name: 'Sexo'},
            { status: false, name: 'CEP'},
            { status: false, name: 'Rua'},
            { status: false, name: 'Bairro'},
            { status: false, name: 'Cidade'},
            { status: false, name: 'Estado'},
            { status: false, name: 'Número'},
            { status: false, name: 'Email'},
            { status: true, name: 'Status'},
            { status: false, name: 'CNS(Sus)'},
            { status: true, name: 'Fator Sanguíneo'},
            { status: false, name: 'Estado Civil'},
            { status: false, name: 'Etnia'},
            { status: false, name: 'Escolaridade'},
            { status: false, name: 'Profissão'},
            { status: false, name: 'Nome do Pai'},
            { status: false, name: 'Nome da Mãe'},
            { status: false, name: 'Nome do Conjuge'},
            { status: false, name: 'Hobbie'}



        ];

        /*dialog Show columsn*/

        $scope.showColumns = function($event) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'src/fragments/showColumns.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    controller: DialogController,
                    controllerAs: 'ctrl',
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,

                    locals: {
                        columns: $scope.columns,
                        indeter: $scope.indeter
                    }

                }


            ).then(function() {



            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });

            function DialogController($scope, $mdDialog, columns, indeter) {
                $scope.columns = columns;
                $scope.indeter = indeter;
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        };




        /* Fim show/hide columns*/



        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir este Paciente?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Paciente')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(pacienteUrl, $scope.selected[0], function(status,data) {

                    $scope.pacientes.splice($scope.pacientes.indexOf(pacienteUrl), 1);
                    openToast('paciente \'' + $scope.selected[0].nome + '\' deleted.', 'success');
                    $scope.selected = [];
                });

            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };




        $scope.getDesserts = function(){
            $scope.myLimit = $scope.query.limit;
            $scope.myPage = $scope.query.page;

        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = $scope.query.page;
            }

            if(newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if(!newValue) {
                $scope.query.page = bookmark;
            }

            $scope.getDesserts();
        });


        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };




        $scope.editPaciente = function($event,editarpaciente_aux) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            console.log(editarpaciente_aux);
            if(editarpaciente_aux != null){
                $scope.paciente = editarpaciente_aux;
            }



            mdDialog.show({
                templateUrl: 'src/paciente/dialog/editPacienteDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditPacienteDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarPaciente: $scope.selected,
                    _editarpaciente_aux: editarpaciente_aux,
                    _editPaciente: $scope.editPaciente
                }

            }). then(function(paciente) { // * Obs fazer de outra forma


                for(var i = 0 ; i < $scope.pacientes.length; i++){
                    if($scope.pacientes[i].id === paciente.id) {
                        $scope.pacientes[i] = paciente;
                    }
                }

                $scope.selected = [];
               // openToast("Paciente added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


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





                    $scope.pacientes.push(paciente);




            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


     


        $scope.data_loading = true;
        RestSrv.find(pacienteUrl, function(status,data) {
            $timeout(function(){ // give delay for good UI
                $scope.data_loading = true;
                $scope.pacientes = data;
                $scope.desserts = $scope.pacientes;

                $scope.data_loading = false;

            }, 1000);


            openToast('Loaded Pacientes with success.', 'success');


        });
        
        

       

    });

