"use strict";

angular.module('clinica')

    .controller('SetorCtrl',function ( $mdDialog, $scope, $mdMedia, $mdToast,RestSrv,SERVICE_PATH, $rootScope)  {
        $rootScope.statusMenu = true;
        var setorUrl = SERVICE_PATH.PRIVATE_PATH + '/setor';

        $scope.setor = {};
        $scope.setores = [];
        $scope.order = 'nome';
        


        var mdDialog = $mdDialog;


        this.cancel = $mdDialog.cancel;




        /*show/hide columns*/
        $scope.indeter = false;
        $scope.columns = [
            { status: true, name: 'id'},
            { status: true, name: 'descrição'},


        ];
        $scope.showColumns = function($event) {
            // Appending dialog to document.body to cover sidenav in docs app
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show(

                {
                    templateUrl: 'appsrc/fragments/showColumns.html',
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


        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Tem certeza que deseja excluir este Setor?')
                .textContent('Caso exclua o mesmo ficará indisponível para manipulação no sistema.')
                .ariaLabel('Delete Setor')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {

                RestSrv.delete(setorUrl, $scope.selected[0], function(status,data) {

                    $scope.setores.splice($scope.setores.indexOf(setorUrl), 1);
                    openToast('setor \'' + $scope.selected[0].nome + '\' deleted.', 'success');
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




        $scope.editSetor = function($event) {



            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));


            mdDialog.show({
                templateUrl: 'appsrc/setor/dialog/editSetorDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'EditSetorDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    _editarSetor: $scope.selected
                }

            }). then(function(setor) { // * Obs fazer de outra forma

                for(var i = 0 ; i < $scope.setores.length; i++){
                    if($scope.setores[i].id === setor.id) {
                        $scope.setores[i] = setor;
                    }
                }

                $scope.selected = [];

            }, function () {
                console.log('You cancelled the dialog.');

            });


        };

        $scope.formSetorScope = [];
        $scope.setFormNewSetorScope = function(scope) {
            $scope.formSetorScope = scope;

        };

        $scope.addSetor = function($event) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            mdDialog.show({
                templateUrl: 'appsrc/setor/dialog/newSetorDialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controller: 'NewSetorDialogController',
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen

            }).then(function(setor) {




                    $scope.setores.push(setor);

                  


            }, function () {
                console.log('You cancelled the dialog.');

            });


        };


        RestSrv.find(setorUrl, function(status,data) {
            $scope.setores = data;
            $scope.desserts = $scope.setores;

            openToast('Loaded Setors with success.', 'success');


        });

    });

