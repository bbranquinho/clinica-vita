"use strict";



angular.module('clinica')

    .controller('CargoCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope)  {
        /*show Menu*/
        $rootScope.statusMenu = true;

        /*Url de Cargo*/
        let cargoUrl = SERVICE_PATH.PRIVATE_PATH + '/cargo';




        /*Cargo View*/
        $scope.cargo = {};
        $scope.cargos = [];
        $scope.order = 'nome';
        

        /*Dialog*/
        let mdDialog = $mdDialog;
        this.cancel = $mdDialog.cancel;





        /*show/hide columns*/
        $scope.indeter = false;
        $scope.columns = [
            { status: true, name: 'id'},
            { status: true, name: 'descricao'},


        ];

        
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


        /*filter and pagination and order */
        let bookmark;

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



        /*show dialog delete registro*/
        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            let confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir este Cargo?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Cargo')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(cargoUrl, $scope.selected[0], function(status,data) {

                    $scope.cargos.splice($scope.cargos.indexOf(cargoUrl), 1);
                    openToast('cargo \'' + $scope.selected[0].nome + '\' deleted.', 'success');
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


        /*Show message*/
        function openToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };




        $scope.editCargo = function($event) {



            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'src/cargo/dialog/editCargoDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditCargoDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarCargo: $scope.selected
                }

            }). then(function(cargo) { // * Obs fazer de outra forma

                for(let i = 0 ; i < $scope.cargos.length; i++){
                    if($scope.cargos[i].id === cargo.id) {
                        $scope.cargos[i] = cargo;
                    }
                }
                
                /*RestSrv.edit(cargoUrl, cargo, function(status, data){
                    if(status ==='ok'){

                        for(var i = 0 ; i < $scope.cargos.length; i++){
                            if($scope.cargos[i].id === cargo.id) {
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


                });*/
                $scope.selected = [];
               // openToast("Cargo added");
            }, function () {
                console.log('You cancelled the dialog.');

            });


        };

        $scope.formCargoScope = [];
        $scope.setFormNewCargoScope = function(scope) {
            $scope.formCargoScope = scope;

        };

        $scope.addCargo = function($event) {
            let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

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

               /* if(cargo.id){
                    RestSrv.edit(cargoUrl, fabricante, function(status, data){
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

                }else{*/
                    $scope.cargos.push(cargo);

                    /*RestSrv.add(cargoUrl, cargo, function(status,data) {

                        if(status ==='ok'){
                            $scope.cargos.push(data.data);
                            $scope.statusError = 'success';
                            $scope.message = data.atributeMessage.MENSAGEM;


                            openToast('cargo \'' + cargo.nome + '\' added.', 'success');
                        }else{
                            $scope.statusError = 'unsuccess';
                            $scope.messages = data.fieldsErrorMessages;
                            $scope.fields = data.mapOfFields;
                            console.log(data);
                        }

                    });
                }*/


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        RestSrv.find(cargoUrl, function(status,data) {
            $scope.cargos = data;
            $scope.desserts = $scope.cargos;

            openToast('Loaded Cargos with success.', 'success');


        });

    });

